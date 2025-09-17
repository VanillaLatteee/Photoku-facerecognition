import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "ripple inline-flex items-center justify-center rounded-2xl px-4 py-3 font-medium transition active:scale-[.98]";
  const styles =
    variant === "primary"
      ? "bg-primary text-white shadow-lg hover:brightness-110 disabled:opacity-50"
      : "bg-white/60 text-neutral-900 border border-white/60 backdrop-blur hover:bg-white/80";
  return (
    <button className={`${base} ${styles} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}