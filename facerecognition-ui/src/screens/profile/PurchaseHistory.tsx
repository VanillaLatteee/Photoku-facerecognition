// src/screens/profile/PurchaseHistory.tsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dummyTransactions = [
  {
    id: 1,
    photoUrl: "/photo1.jpg",
    status: "menunggu",
    price: 38000,
    date: "15 Jan 2023, 17:13",
    countdown: "01:23:23",
  },
  {
    id: 2,
    photoUrl: "/photo2.jpg",
    status: "sukses",
    price: 38000,
    date: "15 Jan 2023, 17:13",
  },
  {
    id: 3,
    photoUrl: "/photo1.jpg",
    status: "gagal",
    price: 38000,
    date: "15 Jan 2023, 17:13",
  },
];

const statusMap: Record<string, { label: string; color: string; bg: string }> =
  {
    menunggu: {
      label: "Menunggu Pembayaran",
      color: "text-orange-500",
      bg: "bg-orange-50 border-orange-400",
    },
    sukses: {
      label: "Sukses",
      color: "text-green-600",
      bg: "bg-green-50 border-green-600",
    },
    gagal: {
      label: "Gagal",
      color: "text-red-500",
      bg: "bg-red-50 border-red-500",
    },
  };

export default function PurchaseHistory() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-24 pt-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-medium">Riwayat Pembelian</h1>
      </div>

      {/* List Transaksi */}
      <div className="space-y-4">
        {dummyTransactions.map((tx) => (
          <div
            key={tx.id}
            className="w-full max-w-md rounded-2xl bg-white border shadow p-3"
          >
            <div className="flex items-start gap-3">
              {/* Gambar Kiri */}
              <img
                src={tx.photoUrl}
                alt="Foto"
                className="w-16 h-16 rounded-xl object-cover"
              />

              {/* Konten Kanan */}
              <div className="flex-1 flex flex-col gap-1">
                {/* Status Badge */}
                <div className="flex justify-end">
                  <span
                    className={`text-xs px-2 py-[2px] rounded-full border font-semibold ${
                      statusMap[tx.status].color
                    } ${statusMap[tx.status].bg}`}
                  >
                    {statusMap[tx.status].label}
                    {tx.status === "menunggu" && tx.countdown
                      ? `: ${tx.countdown}`
                      : ""}
                  </span>
                </div>

                {/* Tanggal */}
                <div className="text-right text-[12px] text-gray-400">
                  {tx.date}
                </div>

                {/* Harga */}
                <div className="text-right text-sm text-gray-600">
                  Harga{" "}
                  <span className="text-black font-bold">
                    Rp{tx.price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            {tx.status === "menunggu" && (
              <div className="mt-4 flex justify-center">
                <button className="w-full max-w-xs rounded-full border border-[#001A41] text-[#001A41] text-sm font-medium py-2">
                  Lihat panduan bayar
                </button>
              </div>
            )}

            {tx.status === "gagal" && (
              <div className="mt-4 flex justify-center">
                <button className="w-full max-w-xs rounded-full bg-[#001A41] text-white text-sm font-medium py-2">
                  Coba beli lagi
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
