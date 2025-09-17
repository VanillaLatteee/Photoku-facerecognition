import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { illustration_success_hand } from "../../../assets/illustrations";
import icDownloadNoBg from "../../../assets/icons/icon_download_no_bg.svg";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { RootState } from "../../../store"; // sesuaikan path
const SuccessPage = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  const transaction = useSelector((state: RootState) => state.transaction);
  console.log("transaction", transaction);
  const { items, paymentMethod, total } = transaction;

  const detailRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!detailRef.current) return;

    const canvas = await html2canvas(detailRef.current, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    // Membuat link download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `transaksi-${id}.png`;
    link.click();
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div
        className="flex w-full max-w-md flex-col items-center justify-center bg-white p-4"
        ref={detailRef}
      >
        {/* Ilustrasi */}
        <img
          src={illustration_success_hand}
          alt="Success"
          className="mb-4 h-16 w-16"
        />

        {/* Judul dan Subjudul */}
        <h2 className="text-center text-lg font-semibold">
          Transaksi Sukses {id}
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Pembayaran berhasil dan foto kamu bisa kamu simpan sekarang
        </p>

        {/* Box Detail Transaksi */}
        <div className="w-full rounded-md bg-gray-100 p-4 text-sm text-gray-800">
          <div className="mb-2 flex justify-between">
            <span className="font-semibold">Detail Transaksi</span>
            <span></span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="">Tanggal</span>
            <span>{new Date().toLocaleDateString("id-ID")}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="">No. Transaksi</span>
            <span>AL4678790</span>
          </div>
          <div className="mb-4 flex justify-between border-b border-gray-300 pb-2">
            <span className="">Metode Pembayaran</span>
            <span>{paymentMethod}</span>
          </div>
          {items.map((item, index) => (
            <div className="mb-1 flex justify-between" key={index}>
              <span>{item.date}</span>
              <span>Rp{item.price.toLocaleString()}</span>
            </div>
          ))}

          <div className="flex justify-between border-t border-gray-300 pt-2 font-semibold">
            <span>Total Harga</span>
            <span className="">{total}</span>
          </div>
        </div>
      </div>
      {/* Tombol Simpan */}
      <button
        onClick={handleDownload}
        className="mt-6 flex w-full items-center justify-center gap-1 rounded-full border border-gray-400 py-2 text-sm font-medium transition hover:bg-gray-200"
      >
        Simpan <img src={icDownloadNoBg} alt="icon download" />
      </button>

      {/* Tombol Ke Homepage */}
      <button
        onClick={() => navigate("/home")}
        className="mt-3 w-full rounded-full bg-blue-900 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
      >
        Ke Homepage
      </button>
    </div>
  );
};

export default SuccessPage;
