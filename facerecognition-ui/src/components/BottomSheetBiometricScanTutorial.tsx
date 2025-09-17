import ButtonPrimary from "./ButtonPrimary";
import {
  sampleBiometricFalse,
  sampleBiometricTrue1,
  sampleBiometricTrue2,
  sampleBiometricTrue3,
} from "../assets";
import { icFalse, icTrue } from "../assets/icons";

export default function BottomSheetBiometricScanTutorial({
  onClose,
}: {
  onClose: () => void;
}) {
  const images = [
    {
      src: sampleBiometricFalse,
      label: icFalse,
      status: "Salah",
    },
    {
      src: sampleBiometricTrue1,
      label: icTrue,
      status: "Benar",
    },
    {
      src: sampleBiometricTrue2,
      label: icTrue,
      status: "Benar",
    },
    {
      src: sampleBiometricTrue3,
      label: icTrue,
      status: "Benar",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
      <div className="w-full max-w-md rounded-t-3xl bg-[#EFF1F4B2] px-6 pt-5 pb-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between my-4">
          <label className="font-poppins text-[20px] font-bold text-black text-center">
            Pastikan wajahmu terlihat saat proses pindai wajah
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 p-3">
          {images.map((item, index) => (
            <div key={index} className="bg-white rounded-[16px] border-white">
              <div className="flex justify-center items-center">
                <img
                  src={item.src}
                  width={100}
                  height={130}
                  className="object-cover"
                />
              </div>

              <div className="p-3 flex items-center justify-center space-x-1">
                <img src={item.label} width={24} height={24} className="mr-2" />{" "}
                <span>
                  <label className="font-medium text-[18px]">
                    {item.status}
                  </label>
                </span>
              </div>
            </div>
          ))}
        </div>

        <ButtonPrimary onClick={onClose} className="mt-4">
          Mengerti dan Mulai Scan
        </ButtonPrimary>
      </div>
    </div>
  );
}
