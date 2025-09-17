import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function ButtonSecondary({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-full border border-[#001A41] bg-white px-5 py-4 text-[20px] font-normal text-[#181C21] shadow-sm hover:bg-slate-50 active:scale-[.99]"
    >
      {children}
    </button>
  );
}
