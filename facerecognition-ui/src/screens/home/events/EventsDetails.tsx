import { useNavigate } from "react-router-dom";
import { icBack } from "../../../assets/icons";

export default function EventsList() {
  const navigate = useNavigate();
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
        <h1 className="text-[20px] font-normal">Event Detail</h1>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <label className="block text-xl font-normal text-[#001A41]">
          Coming Soon
        </label>
      </div>
    </div>
  );
}
