// src/screens/Scan.tsx
import { useMemo, useRef, useState } from "react";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";
import { API_BASE, Photo, useSearchBySelfie } from "../hooks/useApi";

type ResultItem = {
  imageId?: string;
  url?: string;
  thumb_url?: string;
  score?: number;     // similarity (optional)
  [k: string]: any;   // tolerate unknown fields
};

const EVENT_PRESETS = [
  { id: "bdm-001", label: "🏸 Badminton" },
  { id: "running", label: "🏃 Running" },
  { id: "ult-001", label: "🥏 Ultimate" },
];

export default function Scan() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [eventId, setEventId] = useState<string>(EVENT_PRESETS[0].id);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // search params (default sesuai preferensi kamu)
  const [topN, setTopN] = useState<number>(20);
  const [minSim, setMinSim] = useState<number>(0.4);
  const [threshold, setThreshold] = useState<number>(0.5);

  const { searchBySelfie, loading, error, results } = useSearchBySelfie();

  const onPick = () => fileRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onSearch = async () => {
    if (!file) return;
    await searchBySelfie({ eventId, file, topN, minSim, threshold });
  };

  // Normalisasi hasil (backend bisa return dengan key berbeda)
  const items: ResultItem[] = useMemo(() => {
    if (!results) return [];
    // coba beberapa bentuk umum:
    if (Array.isArray(results)) return results as ResultItem[];
    if (Array.isArray(results?.top)) return results.top as ResultItem[];
    if (Array.isArray(results?.photos)) return results.photos as ResultItem[];
    if (Array.isArray(results?.data)) return results.data as ResultItem[];
    return [];
  }, [results]);

  const imgSrc = (p: Partial<Photo>) =>
    p?.thumb_url ? `${API_BASE}${p.thumb_url}` :
    p?.url       ? `${API_BASE}${p.url}`       :
                   undefined;

  return (
    <div className="space-y-5">
      {/* Input file tersembunyi */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />

      {/* Kartu pengantar */}
      <div className="rounded-3xl bg-white border p-4">
        <p className="text-neutral-700 text-sm">
          Upload selfie kamu, trus kita cari momen kamu 🔎
        </p>
      </div>

      {/* Event + parameter */}
      <div className="rounded-3xl bg-white border p-4 space-y-4">
        {/* Event picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Event</label>
          <div className="flex gap-2">
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="flex-1 rounded-xl border px-3 py-2 bg-white"
            >
              {EVENT_PRESETS.map((e) => (
                <option key={e.id} value={e.id}>{e.label} — {e.id}</option>
              ))}
            </select>
            {/* Editable manual, kalau ID event tidak ada di preset */}
            <input
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-40 rounded-xl border px-3 py-2"
              placeholder="Custom ID"
            />
          </div>
        </div>

        {/* Params */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="flex justify-between text-sm">
              <span>topN</span>
              <span className="tabular-nums">{topN}</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span>minSim</span>
              <span className="tabular-nums">{minSim.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={minSim}
              onChange={(e) => setMinSim(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span>threshold</span>
              <span className="tabular-nums">{threshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Preview / dropzone sederhana */}
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-full rounded-2xl shadow-md"
        />
      ) : (
        <div className="aspect-square rounded-2xl border-2 border-dashed grid place-items-center text-neutral-400">
          Belum ada foto
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onPick} className="flex-1">Pilih Selfie</Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={onSearch}
          disabled={!file || loading}
        >
          {loading ? "Mencari..." : "Cari"}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Hasil */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold">Hasil</h3>

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {items.map((it, idx) => {
              const src = imgSrc(it);
              return (
                <figure key={idx} className="overflow-hidden rounded-xl bg-white border">
                  {src ? (
                    <img src={src} alt={it.imageId || `img-${idx}`} className="w-full h-auto object-cover" />
                  ) : (
                    <div className="aspect-square grid place-items-center text-neutral-400">
                      (no image)
                    </div>
                  )}
                  <figcaption className="px-2 py-1 text-[12px] text-neutral-600 flex justify-between">
                    <span className="truncate">{it.imageId || "—"}</span>
                    {typeof it.score === "number" && (
                      <span className="tabular-nums">{it.score.toFixed(3)}</span>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">Belum ada hasil.</p>
        )}
      </section>
    </div>
  );
}