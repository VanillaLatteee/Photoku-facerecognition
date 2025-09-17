import { ReactNode } from "react";

type Props = {
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function ButtonPrimary({
  disabled = false,
  children,
  onClick,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full px-5 py-4 text-[20px] font-normal shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
        disabled ? "bg-[#DAE0E9] text-[#9CA9B9]" : "bg-[#001A41] text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
}
