import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import ikon SVG
import GoogleIcon from "../assets/icons/icon_google.svg?react";
import PhoneIcon from "../assets/icons/icon_smartphone.svg?react";
import FacebookIcon from "../assets/icons/icon_facebook.svg?react";
import AppleIcon from "../assets/icons/icon_apple.svg?react";

export default function BottomSheetLogin({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center">
      <div className="w-full max-w-md rounded-t-3xl bg-white px-6 pt-5 pb-8 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Metode Login</h2>
          <button onClick={onClose}>
            <X className="text-gray-600" size={20} />
          </button>
        </div>

        {/* Buttons with Icons */}
        <div className="space-y-3 text-sm">
          <button
            onClick={goToRegister}
            className="w-full flex items-center justify-center gap-2 bg-[#001A41] text-white font-medium py-3 rounded-full"
          >
            <PhoneIcon className="w-5 h-5" />
            Menggunakan Nomor Telepon
          </button>

          {/* <button
            onClick={goToRegister}
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white font-medium py-3 rounded-full"
          >
            <FacebookIcon className="w-5 h-5" />
            Sign Up with Facebook
          </button>

          <button
            onClick={goToRegister}
            className="w-full flex items-center justify-center gap-2 border bg-white text-gray-800 font-medium py-3 rounded-full"
          >
            <GoogleIcon className="w-5 h-5" />
            Sign Up with Google
          </button>

          <button
            onClick={goToRegister}
            className="w-full flex items-center justify-center gap-2 bg-black text-white font-medium py-3 rounded-full"
          >
            <AppleIcon className="w-5 h-5" />
            Sign Up with Apple
          </button> */}
        </div>

        {/* Disclaimer */}
        <p className="mt-5 text-xs text-center text-gray-500 leading-relaxed">
          Dengan melanjutkan daftar dan masuk ke akun PhotoKu kamu setuju dengan{" "}
          <a href="#" className="text-[#0050AE] underline">Syarat Ketentuan</a> &{" "}
          <a href="#" className="text-[#0050AE] underline">Aturan Privasi Layanan</a>
        </p>
      </div>
    </div>
  );
}