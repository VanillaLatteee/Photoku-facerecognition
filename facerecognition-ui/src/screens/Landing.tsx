import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Landing() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-white/70 backdrop-blur border border-white/60 shadow-glass p-4">
        <h3 className="font-semibold text-lg">Halo! 👋</h3>
        <p className="text-neutral-600">
          Gas cari fotomu di event. Tap <b>Scan</b> buat mulai!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/gallery"
          className="rounded-2xl bg-white border p-4 text-center"
        >
          <div className="font-semibold">Galeri</div>
          <div className="text-sm text-neutral-500">Foto terbaru</div>
        </Link>
        <Link
          to="/purchase"
          className="rounded-2xl bg-white border p-4 text-center"
        >
          <div className="font-semibold">Checkout</div>
          <div className="text-sm text-neutral-500">Lanjut beli</div>
        </Link>
      </div>

      <div className="rounded-2xl p-4 bg-primary/5 border border-primary/20">
        <div className="font-medium mb-2">Tips</div>
        <ul className="text-sm text-neutral-700 list-disc pl-5 space-y-1">
          <li>Selfie jelas, wajah menghadap kamera</li>
          <li>Minimal cahaya cukup, tanpa filter</li>
        </ul>
      </div>

      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        variant="ghost"
        className="w-full"
      >
        Ke Atas
      </Button>
    </div>
  );
}
