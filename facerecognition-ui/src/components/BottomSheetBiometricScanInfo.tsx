import { useState } from "react";
import { icKeySecurity, icSecurity } from "../assets/icons";
import ItemInfo from "./ItemInfo";
import { Check } from "lucide-react";
import ButtonPrimary from "./ButtonPrimary";
import { useNavigate } from "react-router-dom";

export default function BottomSheetBiometricScanInfo({
  onClose,
}: {
  onClose: () => void;
}) {
  const navigation = useNavigate();
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
      <div className="w-full max-w-md rounded-t-3xl bg-white px-6 pt-5 pb-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between my-4">
          <label className="font-poppins text-[20px] font-bold text-black text-center">
            Data wajah akan digunakan hanya untuk tujuan pencocokan foto
          </label>
        </div>

        {/* Item Info with Icon */}
        <div className="flex flex-col gap-4 my-4">
          <ItemInfo
            img={icSecurity}
            text={
              "Photoku menjaga keamanan data wajah Anda dan melindunginya dari akses tidak sah."
            }
          />
          <ItemInfo
            img={icKeySecurity}
            text={
              "Data tidak dibagikan tanpa izin. Anda bisa akses, ubah, atau hapus data kapan saja lewat tim dukungan kami."
            }
          />
        </div>

        {/* Checkbox S&K */}
        <div className="my-6 flex items-start gap-3 text-black">
          <div
            onClick={() => setAgree(!agree)}
            className={[
              "relative h-5 w-5 shrink-0 rounded-md border-2",
              "cursor-pointer transition-all duration-200",
              agree
                ? "border-[#001A41] bg-[#001A41]"
                : "border-slate-400 bg-white",
            ].join(" ")}
          >
            {agree && (
              <Check size={14} className="absolute inset-0 m-auto text-white" />
            )}
          </div>

          {/* Label */}
          <span className="font-poppins text-[16px] font-normal tracking-wide">
            Saya telah membaca, memahami, & menyetujui syarat & ketentuan
            layanan diatas.
          </span>
        </div>
        <ButtonPrimary
          onClick={() => {
            navigation("/biometric-scan-action");
          }}
        >
          Lanjutkan
        </ButtonPrimary>
      </div>
    </div>
  );
}
