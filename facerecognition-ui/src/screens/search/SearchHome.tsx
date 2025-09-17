import { useNavigate } from "react-router-dom";
import { icBack, icClose, icSearch } from "../../assets/icons";
import { useMemo, useState } from "react";
import { ItemSearchEvents } from "../../components/ItemSearchEvents";

const dummyResults = [
  "#PocariRunBandung",
  "#PocariRunJakarta",
  "#PocariRunBali",
];

export default function SearchResult() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 3) return [];
    return dummyResults.filter((s) => s.toLowerCase().includes(q));
  }, [trimmed]);
  const isTrending = trimmed.length === 0;
  const isResults = trimmed.length >= 3;

  const listTitle = isTrending ? "Trending Tag/Event" : "Hasil Pencarian";
  const listItems = isTrending ? dummyResults : filtered;

  return (
    <div className="min-h-[100dvh] text-slate-900">
      {/* Back + Search Input */}
      <div className="flex items-center gap-2 bg-white px-4 pt-4">
        <img
          src={icBack}
          width={48}
          height={48}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          alt="Kembali"
        />

        <div className="flex flex-1 items-center rounded-full border border-slate-300 px-3 py-2 focus-within:border-slate-400">
          <img src={icSearch} width={18} height={18} className="mr-2" alt="" />
          <input
            type="text"
            placeholder="Cari event/foto saya..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm outline-none placeholder:text-slate-400"
          />
          {trimmed.length > 0 && (
            <img
              src={icClose}
              width={16}
              height={16}
              className="ml-2 cursor-pointer"
              alt="Bersihkan"
              onClick={() => setQuery("")}
            />
          )}
        </div>
      </div>

      {/* Hasil Pencarian */}
      {(isTrending || isResults) && (
        <ItemSearchEvents
          title={listTitle}
          items={listItems}
          emptyText={!isTrending ? `Pencarian Tidak Ditemukan` : undefined}
          onItemClick={(item) => {
            navigate(`/search/detail/${encodeURIComponent(item)}`);
          }}
        />
      )}
    </div>
  );
}
