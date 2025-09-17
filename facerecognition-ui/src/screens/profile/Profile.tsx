// File: src/screens/profile/Profile.tsx
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  ArrowLeft,
  ArrowRight,
  Star,
  Store,
  Clock,
} from "lucide-react";
import ProfileMenuItem from "../../components/ProfileMenuItem";

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "igedeAgus",
    id: "231232424214",
    avatar: "https://i.pravatar.cc/100?img=3",
  };

  const logout = () => {
    localStorage.clear();
    navigate("/onboarding", { replace: true });
  };

  return (
    <div className="text-slate-900 min-h-[100dvh] bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-2">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#001A41]" />
        </button>
        <h1 className="text-[20px] font-normal">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full shadow-md"
        />
        <div className="mt-3 text-lg font-semibold">{user.name}</div>
        <div className="text-sm text-gray-500">ID: {user.id}</div>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-3 px-4">
        <ProfileMenuItem
          icon={<Clock className="w-5 h-5" />}
          label="Riwayat Pembelian"
          onClick={() => navigate("/profile/purchase-history")}
        />
        <ProfileMenuItem
          icon={<Store className="w-5 h-5" />}
          label="Akun Seller"
          onClick={() => alert("Fitur belum tersedia")}
        />
        <ProfileMenuItem
          icon={<Star className="w-5 h-5" />}
          label="Data Wajah Biometrik"
          onClick={() => navigate("/profile/biometric")}
        />
      </div>

      {/* Logout */}
      <div className="mt-10 flex items-center justify-center">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:underline"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}