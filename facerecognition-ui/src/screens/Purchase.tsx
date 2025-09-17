import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

export default function Purchase() {
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  const price = "Rp15.000";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-3">
        <div className="text-sm text-neutral-600">
          Pilih foto → klik beli → bayar (dummy) → done. Gas checkout ya!
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border bg-white">
        <img
          src="https://picsum.photos/seed/checkout/800/600"
          alt="preview"
          className="w-full"
        />
        <div className="p-3 flex items-center justify-between">
          <div>
            <div className="font-semibold">Lisensi Personal</div>
            <div className="text-sm text-neutral-500">Tanpa watermark</div>
          </div>
          <div className="font-bold text-primary">{price}</div>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          className="size-5"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span>Saya setuju S&K.</span>
      </label>

      <Button
        onClick={() => setOpen(true)}
        disabled={!agree}
        className="w-full"
      >
        Gas Checkout
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Bayar instan">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://picsum.photos/seed/checkout/200/160"
              className="w-24 h-20 rounded-lg object-cover"
            />
            <div>
              <div className="font-medium">Lisensi Personal</div>
              <div className="text-neutral-500 text-sm">{price}</div>
            </div>
          </div>
          <Button className="w-full" onClick={() => alert("dummy success!")}>
            Bayar Sekarang
          </Button>
        </div>
      </Modal>
    </div>
  );
}
