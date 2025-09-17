import { useState } from "react";
import { bgBiometricScan } from "../assets";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import BottomSheetBiometricScanInfo from "../components/BottomSheetBiometricScanInfo";
import { useNavigate } from "react-router-dom";

export default function BiometricScan() {
  const navigation = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden flex flex-col justify-end">
      <img
        src={bgBiometricScan}
        alt="Background: face scan illustration"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto mt-8 flex max-w-md flex-1 flex-col px-5 text-center">
        <label className="mt-auto text-[24px] text-black font-bold">
          Pindai wajahmu untuk temukan fotomu secara instan
        </label>
        <label className="my-3 text-[18px] opacity-90">
          Teknologi biometrik kami bantu kamu temukan fotomu dengan mudah
        </label>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-md px-5 my-8 grid gap-3 pb-6 pb-[env(safe-area-inset-bottom)]">
        <ButtonSecondary
          onClick={() => {
            navigation("/home");
          }}
        >
          Nanti Dulu
        </ButtonSecondary>
        <ButtonPrimary onClick={() => setSheetOpen(true)}>
          Mulai Scan Wajah
        </ButtonPrimary>
      </div>
      {sheetOpen && (
        <BottomSheetBiometricScanInfo onClose={() => setSheetOpen(false)} />
      )}
    </div>
  );
}
