import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TrashIcon from "../../assets/icons/trash.svg";
import TrashBoldIcon from "../../assets/icons/trash_bold.svg";
import GopayIcon from "../../assets/icons/gopay.svg";

const dummyItems = [
  {
    id: 1,
    image: "/photo1.jpg",
    date: "11/08/2014",
    price: 38000,
    selected: true,
  },
  {
    id: 2,
    image: "/photo2.jpg",
    date: "11/08/2014",
    price: 50000,
    selected: false,
  },
];

export default function Cart() {
  const [items, setItems] = useState(dummyItems);

  const total = items
    .filter((i) => i.selected)
    .reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="pb-[100px]">
      {/* Header Action */}
      <div className="flex justify-between items-center px-1 text-sm text-slate-700 mb-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={items.every((i) => i.selected)}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((item) => ({ ...item, selected: e.target.checked }))
                )
              }
              className="accent-[#001A41]"
            />
            Pilih Semua
          </label>

          <button className="flex items-center gap-1 text-[#001A41]">
            <img src={TrashIcon} alt="Trash" className="w-4 h-4" />
            Hapus
          </button>
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center bg-white rounded-3xl border shadow px-2 py-2"
          >
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() =>
                  setItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id ? { ...i, selected: !i.selected } : i
                    )
                  )
                }
                className="accent-[#001A41]"
              />

              {/* Gambar */}
              <img
                src={item.image}
                alt="Foto"
                className="w-28 h-20 rounded-xl object-cover"
              />
            </div>

            {/* Detail */}
            <div className="flex-1 ml-4 pt-1 pr-2">
              <div className="text-sm text-slate-500 text-right mt-2">
                {/* Icon trash */}
                <button>
                  <div className="w-8 h-8 rounded-full bg-[#001A41] flex items-center justify-center">
                    <img src={TrashBoldIcon} alt="Trash" className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Tanggal */}
              <div className="text-sm text-slate-500 text-right mt-2">
                {item.date}
              </div>

              {/* Label Harga */}
              <div className="text-sm text-slate-400 text-right mt-1">
                Harga
              </div>

              {/* Nominal Harga */}
              <div className="text-[17px] font-bold text-slate-900 text-right">
                Rp{item.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="fixed bottom-16 inset-x-0 bg-white p-4 border-t shadow-inner z-50">
        <div className="max-w-md mx-auto">
          {/* Metode Pembayaran */}
          <div className="flex justify-between items-center border rounded-xl px-4 py-3 mb-3">
            <div className="flex items-center gap-2">
              <img
                src={GopayIcon}
                alt="Gopay"
                className="w-[16.67px] h-[16.67px] object-contain"
              />
              <span className="font-medium text-sm">Gopay</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          {/* Total Harga */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500">Total Harga</span>
            <span className="text-lg font-semibold text-black">
              Rp{total.toLocaleString()}
            </span>
          </div>

          {/* Tombol Bayar */}
          <button className="w-full bg-[#001A41] text-white text-[15px] font-semibold py-3 rounded-full">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}