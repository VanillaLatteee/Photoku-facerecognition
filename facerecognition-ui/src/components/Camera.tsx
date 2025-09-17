import { useEffect, useRef, useState } from 'react';

export function Camera({ onShot }: { onShot: (blob: Blob) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamErr, setStreamErr] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        setStreamErr('Kamera tidak bisa diakses.');
      }
    })();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const capture = async () => {
    const v = videoRef.current!;
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(1120, v.videoWidth);
    canvas.height = canvas.width * (v.videoHeight / v.videoWidth);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/jpeg', 0.92));
    onShot(blob);
  };

  if (streamErr) return <p className="text-sm text-red-600">{streamErr}</p>;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black">
      <video ref={videoRef} playsInline muted className="w-full h-auto" />
      <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center">
        <button onClick={capture} className="btn btn-primary w-24 h-12 rounded-full">Ambil</button>
      </div>
    </div>
  );
}