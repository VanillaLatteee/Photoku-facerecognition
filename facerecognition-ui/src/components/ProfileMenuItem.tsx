// src/components/ProfileMenuItem.tsx
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export default function ProfileMenuItem({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 rounded-2xl bg-white border border-gray-200 text-left shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className="text-[#001A41]">{icon}</div>
        <span className="font-medium text-sm text-[#001A41]">{label}</span>
      </div>
      <ChevronRight size={20} className="text-slate-400" />
    </button>
  );
}