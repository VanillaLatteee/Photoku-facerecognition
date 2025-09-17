# app.py
import os
import io
import json
import time
from typing import List, Optional, Tuple

import numpy as np
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image

import faiss
from insightface.app import FaceAnalysis

# ---------- Config ----------
PORT = int(os.getenv("PORT", "9000"))
MODEL_NAME = os.getenv("MODEL_NAME", "buffalo_l")
DB_DIR = "db"
INDEX_PATH = os.path.join(DB_DIR, "index.faiss")
META_PATH = os.path.join(DB_DIR, "meta.json")
IMG_DIR = os.path.join(DB_DIR, "images")
EMBED_DIM = 512  # buffalo_l output

os.makedirs(DB_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

# ---------- Init Face Model ----------
app_face = FaceAnalysis(name=MODEL_NAME, providers=["CPUExecutionProvider"])
app_face.prepare(ctx_id=-1, det_size=(640, 640))  # CPU only

# ---------- FAISS + Metadata ----------
def _new_index() -> faiss.Index:
    return faiss.IndexFlatIP(EMBED_DIM)  # cosine via inner product on L2-normed

def _load_index_and_meta():
    if os.path.exists(INDEX_PATH):
        index = faiss.read_index(INDEX_PATH)
    else:
        index = _new_index()
    if os.path.exists(META_PATH):
        with open(META_PATH, "r", encoding="utf-8") as f:
            meta = json.load(f)
    else:
        meta = {"ids": [], "items": []}
    return index, meta

def _save_index_and_meta(index, meta):
    faiss.write_index(index, INDEX_PATH)
    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)

index, meta = _load_index_and_meta()

def _np_normalize(v: np.ndarray) -> np.ndarray:
    n = np.linalg.norm(v, axis=1, keepdims=True)
    n[n == 0] = 1.0
    return v / n

# ---------- Utils ----------
def _pil_from_upload(file: UploadFile) -> Image.Image:
    content = file.file.read()
    try:
        img = Image.open(io.BytesIO(content)).convert("RGB")
        return img
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image")

def _get_embedding(img: Image.Image) -> Tuple[np.ndarray, float]:
    arr = np.array(img)[:, :, ::-1].copy()  # RGB->BGR
    faces = app_face.get(arr)
    if not faces:
        raise HTTPException(status_code=422, detail="No face detected")

    faces.sort(key=lambda f: (f.bbox[2]-f.bbox[0])*(f.bbox[3]-f.bbox[1]), reverse=True)
    face = faces[0]
    emb = face.normed_embedding  # (512,)
    if emb is None or emb.shape[0] != EMBED_DIM:
        raise HTTPException(status_code=500, detail="Failed to get embedding")
    emb = emb.reshape(1, -1).astype("float32")

    bbox = face.bbox
    det_score = float(getattr(face, "det_score", 0.5))
    liveness = max(0.0, min(1.0, 0.4 + 0.6 * det_score))  # placeholder
    return emb, liveness

def _search(emb: np.ndarray, top_k: int = 5):
    if index.ntotal == 0:
        return [], []
    sims, ids = index.search(emb, top_k)
    return sims[0].tolist(), ids[0].tolist()

# ---------- Schemas ----------
class EmbedResponse(BaseModel):
    embedding: List[float]
    liveness_score: float

class VerifyResponse(BaseModel):
    pose: str
    match_score: float
    liveness_score: float
    verified: bool
    best_match: Optional[dict] = None

class SearchHit(BaseModel):
    score: float
    meta: dict

class SearchResponse(BaseModel):
    hits: List[SearchHit]

# ---------- App ----------
app = FastAPI(title="Face Service (InsightFace + FAISS)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "ntotal": index.ntotal}

@app.post("/face/embed", response_model=EmbedResponse)
async def face_embed(file: UploadFile = File(...)):
    img = _pil_from_upload(file)
    emb, liveness = _get_embedding(img)
    return {"embedding": emb[0].tolist(), "liveness_score": float(liveness)}

@app.post("/face/enroll")
async def face_enroll(
    user_id: str = Form(...),
    pose: Optional[str] = Form(None),
    file: UploadFile = File(...),
):
    # simpan file mentah (opsional, berguna untuk audit)
    raw = file.file.read()
    fname = f"{int(time.time()*1000)}-{user_id}-{pose or 'unknown'}.jpg"
    fpath = os.path.join(IMG_DIR, fname)
    with open(fpath, "wb") as f:
        f.write(raw)

    img = Image.open(io.BytesIO(raw)).convert("RGB")
    emb, _ = _get_embedding(img)

    global index, meta
    if not isinstance(index, faiss.Index):
        index = _new_index()

    vec = emb.astype("float32")
    index.add(vec)

    row_id = len(meta["ids"])
    meta["ids"].append(row_id)
    meta["items"].append({
        "row_id": row_id,
        "user_id": user_id,
        "pose": pose,
        "ts": int(time.time()),
        "file": fname,
    })
    _save_index_and_meta(index, meta)
    return {"ok": True, "row_id": row_id, "file": fname}

@app.post("/face/verify", response_model=VerifyResponse)
async def face_verify(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None),
    pose: Optional[str] = Form(None),
    thresh: float = Form(0.5),
    liveness_thresh: float = Form(0.7),
):
    img = _pil_from_upload(file)
    emb, liveness = _get_embedding(img)

    scores, ids = _search(emb, top_k=5)
    best_score = 0.0
    best_item = None
    for sc, idx in zip(scores, ids):
      if idx < 0:
          continue
      item = meta["items"][idx]
      if (user_id is None) or (item.get("user_id") == user_id):
          if sc > best_score:
              best_score = float(sc)
              best_item = item

    verified = (liveness >= liveness_thresh) and (best_score >= thresh)
    return {
        "pose": pose or "unknown",
        "match_score": best_score,
        "liveness_score": float(liveness),
        "verified": bool(verified),
        "best_match": best_item,
    }

@app.post("/face/search", response_model=SearchResponse)
async def face_search(
    file: UploadFile = File(...),
    top_k: int = Form(5),
):
    img = _pil_from_upload(file)
    emb, _ = _get_embedding(img)
    scores, ids = _search(emb, top_k=top_k)
    hits = []
    for sc, idx in zip(scores, ids):
        if idx < 0:
            continue
        hits.append({"score": float(sc), "meta": meta["items"][idx]})
    return {"hits": hits}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=PORT, reload=True)
