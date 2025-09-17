import { icArrowRight, icNotFound } from "../assets/icons";

export function ItemSearchEvents({
  title,
  items,
  onItemClick,
  emptyText,
}: {
  title: string;
  items: string[];
  onItemClick: (item: string) => void;
  emptyText?: string;
}) {
  return (
    <div className="mx-4 mt-4 overflow-hidden rounded-[16px] bg-white shadow-sm">
      <div className="border-b px-4 py-3">
        <h2 className="text-[16px] font-bold text-[#181C21]">{title}</h2>
      </div>

      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li
              key={item}
              className="flex cursor-pointer items-center justify-between border-b px-4 py-3 last:border-none hover:bg-slate-50"
              onClick={() => onItemClick(item)}
            >
              <span className="text-[16px] font-normal">{item}</span>
              <img src={icArrowRight} width={24} height={24} alt="" />
            </li>
          ))}
        </ul>
      ) : (
        emptyText && (
          <div className="mt-4 flex flex-col items-center justify-center">
            <img src={icNotFound} width={128} height={128} alt="" />
            <div className="px-4 py-6 text-[18px] text-[#181C21]">
              Pencarian Tidak Ditemukan
            </div>
          </div>
        )
      )}
    </div>
  );
}
