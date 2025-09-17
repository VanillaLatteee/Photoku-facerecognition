import { FC } from "react";
import { useNavigate } from "react-router-dom";

// Import ikon SVG jika kamu pakai SVG inline atau file `.svg?react`
// Kalau belum, kamu bisa pakai lucide-react juga

import SearchIcon from "../assets/icons/icon_search.svg?react";
import ProfileIcon from "../assets/icons/icon_profile.svg?react";

type Props = {
  title?: string;
};

const TopBar: FC<Props> = ({ title = "PhotoKu" }) => {
  const navigate = useNavigate();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
      style={{ height: "var(--topbar-h)" }}
    >
      <div className="h-full max-w-md mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-[17px] font-semibold text-black">{title}</h1>

        {/* Action icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/search")}>
            <SearchIcon className="w-5 h-5 text-black" />
          </button>

          <button onClick={() => navigate("/profile")} className="relative">
            <ProfileIcon className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 block h-[10px] w-[10px] rounded-full bg-red-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
