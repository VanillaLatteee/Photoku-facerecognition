import { icLocation } from "../assets/icons";

export default function LocationBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-slate-600">
      <img src={icLocation} width={24} height={24} />
      <div className="text-[13px]">
        <span className="text-[#718290] text-[16px] font-normal">
          Lokasi kamu
        </span>
        <span className="mx-1 text-]16px]">
          PIK2, Jakarta Utara, DKI Jakarta
        </span>
      </div>
    </div>
  );
}
