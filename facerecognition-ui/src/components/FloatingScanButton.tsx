import { Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FloatingScanButton() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const hidden = pathname === "/scan";

  if (hidden) return null;

  return (
    <button
      onClick={() => nav("/scan")}
      className="fixed bottom-6 right-6 z-40 ripple
                 rounded-full w-16 h-16 flex items-center justify-center
                 bg-primary text-white shadow-lg active:scale-95 transition
                 focus:outline-none"
      aria-label="Scan"
    >
      <Camera />
    </button>
  );
}