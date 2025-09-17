import { FC } from "react";
import { Camera } from "lucide-react";

type Props = { onClick?: () => void };

const FAB: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed z-50 left-1/2 -translate-x-1/2 rounded-full btn ripple text-white shadow-glass"
      style={{
        bottom: "calc(var(--bottomnav-h) + 16px)",
        width: 64,
        height: 64,
        background: "linear-gradient(135deg,#FF3C49,#E60012)",
      }}
      aria-label="Scan"
    >
      <Camera size={24} />
    </button>
  );
};

export default FAB;