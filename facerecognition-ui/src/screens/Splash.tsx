// src/screens/Splash.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      const onboarded = localStorage.getItem("onboarded") === "1";
      navigate(onboarded ? "/register" : "/onboarding", { replace: true });
    }, 1200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-white">
      <div className="w-24 h-24 rounded-3xl bg-[--btn-bg,theme(colors.tsel.primary)] grid place-items-center text-white text-3xl font-bold animate-pulse">
        FA
      </div>
      <div className="mt-6 text-xl font-semibold">PhotoKu</div>
      <p className="mt-1 text-slate-500">“cek momen kamu ✨”</p>
      <div className="mt-8 w-36 h-2 rounded-full bg-slate-200 overflow-hidden">
        <div className="h-full w-1/2 bg-slate-400/60 animate-[shimmer_1.2s_linear_infinite]" />
      </div>
    </div>
  );
}