import { useNavigate, useParams } from "react-router-dom";
import { icBack } from "../../assets/icons";
import {
  dummyPocariRunBali,
  dummyPocariRunBandung,
  dummyPocariRunJakarta,
} from "../../hooks/useSearch";
import MosaicSwiper from "../../components/MosaicSwiper";

export default function SearchDetail() {
  const navigate = useNavigate();
  const { item } = useParams();

  // Sample Data Sets
  const datasets: Record<string, string> = {
    "#PocariRunBandung": dummyPocariRunBandung,
    "#PocariRunJakarta": dummyPocariRunJakarta,
    "#PocariRunBali": dummyPocariRunBali,
  };
  const rawJson = datasets[item ?? ""] ?? '{"data": []}';
  let parsed: { data: Array<{ id: number; src: string }> } = { data: [] };
  try {
    parsed = JSON.parse(rawJson);
  } catch {}
  const data = parsed.data;
  const panels = data.map((p: { src: any; id: any }) => ({
    src: p.src,
    alt: `CFD ${p.id}`,
  }));

  return (
    <div className="h-full overflow-hidden text-slate-900">
      <div className="sticky top-0 z-10 mt-4 flex items-center gap-3">
        <img
          src={icBack}
          width={48}
          height={48}
          onClick={() => navigate(-1)}
          className="cursor-pointer transition active:scale-95"
          alt="Back"
        />
        <h1 className="text-[20px] font-normal">{item}</h1>
      </div>

      <div className="mx-4">
        <MosaicSwiper columns={2} mode="more" panels={panels} />
      </div>
    </div>
  );
}
