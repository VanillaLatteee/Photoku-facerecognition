// src/screens/Onboarding.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Gambar/ornamen (pastikan path sesuai dengan project kamu)
import bgPhoto from "../assets/hero/onboarding-hero.jpg";
import ornLeft from "../assets/ornaments/OrnamentLeft.png";
import ornRight from "../assets/ornaments/OrnamentRight.png";
import { Check } from "lucide-react";
import BottomSheetLogin from "../components/BottomSheetLogin";

export default function Onboarding() {
  const [agree, setAgree] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const navigate = useNavigate();

  const finish = () => {
    if (!agree) return;
    localStorage.setItem("onboarded", "1");
    setShowSheet(true);
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* ===== Background foto full ===== */}
      <img
        src={bgPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover select-none"
        draggable={false}
      />

      {/* ===== Ornamen Telkomsel ===== */}
      <img
        src={ornLeft}
        alt=""
        className="pointer-events-none select-none absolute left-0 top-1/4 h-50"
        draggable={false}
      />
      <img
        src={ornRight}
        alt=""
        className="pointer-events-none select-none absolute right-0 top-0 h-50"
        draggable={false}
      />
      {/* <img
        src={ornBottom}
        alt=""
        className="pointer-events-none select-none absolute bottom-0 left-0 w-full"
        draggable={false}
      /> */}
      <div className="pointer-events-none select-none absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-white via-white/50 to-white/0" />

      {/* Soft glow kanan atas biar ada highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 right-0 h-[50%] w-[50%] rounded-full opacity-10 blur-2xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.28) 60%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Gradient gelap bawah untuk kontras teks */}

      {/* ===== Konten bawah (title + copy + checkbox + tombol) ===== */}
      <div className="relative z-10 mx-auto w-full max-w-md px-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
        {/* Spacer supaya konten benar2 di bawah (tanpa header) */}
        <div className="h-[66vh]" />

        <h1 className="font-poppins text-black text-center text-2xl font-semibold tracking-wider">
          Akses cari foto momen yang
          <br />
          instan dan mudah
        </h1>

        <p className="font-poppins font-light mt-3 text-black/95 text-center text-xl leading-relaxed tracking-wide ">
          Teknologi biometrik canggih kami <br /> memastikan kamu menemukan foto
          kamu
        </p>

        {/* Checkbox S&K */}
        <div className="mt-6 flex items-start gap-3 text-black/95">
          {/* Custom checkbox div */}
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
          <span className="font-poppins text-sm font-light tracking-wide">
            Saya telah membaca, memahami, & <br />
            menyetujui{" "}
            <Link to="/terms" className="underline text-[#0050AE]">
              Syarat & Ketentuan PhotoKu
            </Link>
          </span>
        </div>

        {/* Tombol Mulai */}
        <button
          onClick={finish}
          disabled={!agree}
          className={[
            "mt-5 w-full  rounded-full px-5 text-[17px] font-semibold transition ",
            // gaya glassy saat nonaktif, merah Telkomsel saat aktif
            agree
              ? "bg-[#001A41] text-white text-xl font-extralight py-2.5 "
              : " bg-[#DAE0E9] text-[#9CA9B9] shadow-sm text-2xl font-extralight tracking-wide py-2",
          ].join(" ")}
        >
          {!agree ? "Mulai" : "Bergabung Sekarang"}
        </button>
        {showSheet && <BottomSheetLogin onClose={() => setShowSheet(false)} />}
      </div>
    </div>
  );
}
