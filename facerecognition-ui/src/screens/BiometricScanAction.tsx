// src/pages/BiometricScanAction.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { icBack } from "../assets/icons";
import BottomSheetBiometricScanTutorial from "../components/BottomSheetBiometricScanTutorial";
import { samplePhoto } from "../assets";
import { useNavigate } from "react-router-dom";

type Pose = "front" | "left" | "right";
const POSES: Pose[] = ["front", "left", "right"];
const POSE_LABEL: Record<Pose, string> = {
  front: "Wajah menghadap depan",
  left: "Wajah menghadap samping Kiri",
  right: "Wajah menghadap samping Kanan",
};

// Endpoint: relatif agar lewat proxy Vite → Go
const BIOMETRIC_ENDPOINT =
  import.meta.env.VITE_BIOMETRIC_ENDPOINT || "/api/biometric/verify";

type VerifyResult = {
  ok: boolean;
  result?: {
    pose: Pose;
    fileStoredAs?: string;
    matchScore?: number;
    livenessScore?: number;
    verified?: boolean;
    receivedAt?: string;
  };
  error?: string;
};

export default function BiometricScanAction() {
  const navigation = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(true);

  // Camera & capture refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Step & timer states
  const [poseIndex, setPoseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCounting, setIsCounting] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mirror hanya untuk kamera depan
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  // Results & gallery
  const [captures, setCaptures] = useState<{ pose: Pose; url: string }[]>([]);
  const [responses, setResponses] = useState<
    Record<
      Pose,
      | {
          fileStoredAs?: string;
          matchScore?: number;
          livenessScore?: number;
          verified?: boolean;
        }
      | undefined
    >
  >({ front: undefined, left: undefined, right: undefined });

  const [showSuccess, setShowSuccess] = useState(false);

  const currentPose: Pose = useMemo(() => POSES[poseIndex], [poseIndex]);
  const progress = useMemo(() => {
    const total = 5;
    const done = Math.max(0, Math.min(total, total - secondsLeft));
    return done / total;
  }, [secondsLeft]);

  // SVG progress ring values
  const R = 160;
  const STROKE = 10;
  const CIRCUM = 2 * Math.PI * R;
  const dash = CIRCUM;
  const offset = CIRCUM * (1 - progress);

  const resetTimer = () => {
    setSecondsLeft(5);
    setIsCounting(true);
  };

  const onRetry = async () => {
    setError(null);
    setIsCounting(true);
    setSecondsLeft(5);
  };

  // Upload ke Backend Go (dengan handling TypeError jaringan)
  async function uploadToBE(pose: Pose, file: File) {
    const form = new FormData();
    form.append("pose", pose);
    form.append("file", file);

    const userId = localStorage.getItem("userId");
    if (userId) form.append("userId", userId);

    const token = localStorage.getItem("sessionToken");
    const authHeaders: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    try {
      const res = await fetch(BIOMETRIC_ENDPOINT, {
        method: "POST",
        headers: authHeaders,
        body: form,
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`Server error (${res.status}): ${text}`);

      let json: VerifyResult;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON from server");
      }

      if (!json.ok) throw new Error(json.error || "Verification failed");
      return json.result;
    } catch (e: any) {
      if (e?.name === "TypeError") {
        throw new Error(
          "Gagal terhubung ke server. Pastikan situs dibuka via HTTPS yang dipercaya & server aktif.",
        );
      }
      throw e;
    }
  }

  // Capture frame → upload → next pose
  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    try {
      setIsUploading(true);
      setError(null);

      const video = videoRef.current;
      const width = video.videoWidth || 720;
      const height = video.videoHeight || 720;
      const size = Math.min(width, height);
      const sx = (width - size) / 2;
      const sy = (height - size) / 2;

      const canvas = canvasRef.current;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.save();
      if (isFrontCamera) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, sx, sy, size, size, -size, 0, size, size);
      } else {
        ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
      }
      ctx.restore();

      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", 0.9),
      );
      const file = new File([blob], `biometric-${currentPose}.jpg`, {
        type: "image/jpeg",
      });

      const url = URL.createObjectURL(blob);

      // call backend Go
      const result = await uploadToBE(currentPose, file);

      // simpan hasil untuk UI
      setCaptures((arr) => [...arr, { pose: currentPose, url }]);
      setResponses((prev) => ({
        ...prev,
        [currentPose]: {
          fileStoredAs: result?.fileStoredAs,
          matchScore: result?.matchScore,
          livenessScore: result?.livenessScore,
          verified: result?.verified,
        },
      }));

      if (poseIndex < POSES.length - 1) {
        setPoseIndex((i) => i + 1);
        setIsUploading(false);
        setTimeout(() => resetTimer(), 400);
      } else {
        setIsUploading(false);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        setShowSuccess(true);
      }
    } catch (e: any) {
      console.error("Upload error:", e?.message);
      setIsUploading(false);
      setIsCounting(false);
      setError(e?.message || "Gagal mengunggah foto. Coba lagi.");
    }
  };

  // Initialize camera on mount
  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 720 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (!isActive) return;
        streamRef.current = stream;
        const track = stream.getVideoTracks()[0];
        const facing = (track.getSettings().facingMode || "user") as string;
        setIsFrontCamera(facing !== "environment");
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (e) {
        console.error(e);
        setError(
          "Kamera tidak dapat diakses. Pastikan izin kamera diaktifkan & halaman dibuka via HTTPS.",
        );
        setIsCounting(false);
      }
    })();

    return () => {
      isActive = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Countdown per pose
  useEffect(() => {
    if (!isCounting) return;
    if (secondsLeft <= 0) return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          handleCapture();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isCounting, secondsLeft, poseIndex]);

  // Aggregate decision sederhana
  const aggregate = useMemo(() => {
    const vals = POSES.map((p) => responses[p]?.matchScore ?? 0).filter(
      Boolean,
    );
    const livenessVals = POSES.map(
      (p) => responses[p]?.livenessScore ?? 0,
    ).filter(Boolean);

    const avgMatch = vals.length
      ? vals.reduce((a, b) => a + b, 0) / vals.length
      : 0;
    const minLiveness = livenessVals.length ? Math.min(...livenessVals) : 0;

    const verified =
      minLiveness >= 0.7 &&
      avgMatch >= 0.5 &&
      POSES.every((p) => responses[p]?.verified);

    return { avgMatch, minLiveness, verified };
  }, [responses]);

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden text-slate-900">
      <div className="sticky top-0 z-10 mt-4 flex w-full items-center gap-3 px-4">
        <img src={icBack} width={48} height={48} />
        <h1 className="text-[20px] font-normal">Lengkapi Data Profil</h1>
      </div>

      {/* Camera + Circular progress */}
      <div className="relative mx-auto mt-8 w-full max-w-md px-4">
        <div className="relative mx-auto aspect-square w-full">
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="absolute inset-0 h-full w-full rounded-full bg-slate-200 object-cover"
            style={{ transform: isFrontCamera ? "scaleX(-1)" : "none" }}
          />

          {/* Fallback image if video not ready */}
          <img
            src={samplePhoto}
            alt="Profil"
            className="pointer-events-none absolute inset-0 h-full w-full rounded-full object-cover opacity-0 data-[fallback=true]:opacity-100"
            data-fallback={!streamRef.current}
          />

          {/* Grey ring underlay */}
          <div className="absolute -inset-[6px] rounded-full border-[6px] border-slate-300" />

          {/* SVG progress ring */}
          <svg
            className="absolute -inset-[6px] -rotate-90"
            viewBox={`${-R - STROKE} ${-R - STROKE} ${(R + STROKE) * 2} ${(R + STROKE) * 2}`}
          >
            <circle
              cx={0}
              cy={0}
              r={R}
              stroke="#E2E8F0"
              strokeWidth={STROKE}
              fill="none"
            />
            <circle
              cx={0}
              cy={0}
              r={R}
              stroke="#A855F7"
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={dash}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          {isCounting && (
            <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1 text-sm text-white/90">
              {secondsLeft}s
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-slate-600">
          {POSE_LABEL[currentPose]}
        </p>

        {error && (
          <div className="mx-auto mt-4 w-full max-w-md text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 rounded-full bg-slate-900 px-4 py-2 text-white"
            >
              Coba lagi
            </button>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
          </div>
        )}
      </div>

      {sheetOpen && (
        <BottomSheetBiometricScanTutorial onClose={() => setSheetOpen(false)} />
      )}

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/70 p-6">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <div className="mt-4 space-y-2 text-left text-white/90">
              {POSES.map((p) => {
                const r = responses[p];
                return (
                  <div key={p} className="text-sm">
                    <div className="font-medium capitalize">{p}</div>
                    <div>Match: {r?.matchScore?.toFixed(2) ?? "-"}</div>
                    <div>Liveness: {r?.livenessScore?.toFixed(2) ?? "-"}</div>
                    <div>
                      Status:{" "}
                      {r?.verified === undefined
                        ? "-"
                        : r?.verified
                          ? "Verified ✅"
                          : "Not verified ❌"}
                    </div>
                  </div>
                );
              })}
              <hr className="my-2 border-white/20" />
              <div className="text-sm">
                <div className="font-medium">Aggregate</div>
                <div>Avg Match: {aggregate.avgMatch.toFixed(2)}</div>
                <div>Min Liveness: {aggregate.minLiveness.toFixed(2)}</div>
                <div>
                  Final:{" "}
                  {aggregate.verified ? "VERIFIED ✅" : "REVIEW NEEDED ⚠️"}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigation("/home")}
              className="mt-5 w-full rounded-full bg-white px-4 py-3 font-medium text-slate-900"
            >
              Lihat foto kamu sekarang
            </button>
          </div>
        </div>
      )}

      {/* Debug gallery */}
      {captures.length > 0 && (
        <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-2 px-4">
          {captures.map((c, idx) => (
            <div
              key={idx}
              className="aspect-square overflow-hidden rounded-xl border border-slate-200"
            >
              <img src={c.url} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
