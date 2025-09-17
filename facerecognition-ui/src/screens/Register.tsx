import { useMemo, useState } from "react";
import { icBack, icRegister } from "../assets/icons";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const emailValid = useMemo(
    () =>
      /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
        email
      ),
    [email]
  );

  const usernameValid = useMemo(
    () => /^([a-z0-9_.]{3,20})$/.test(username),
    [username]
  );

  const phoneValid = useMemo(() => /^\d{9,13}$/.test(phone), [phone]);

  const allValid = emailValid && usernameValid && phoneValid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) return;
    alert(
      JSON.stringify(
        {
          email,
          username: username.startsWith("@") ? username.slice(1) : username,
          phone: `+62${phone}`,
        },
        null,
        2
      )
    );
  };

  return (
    <div className="h-full text-slate-900 overflow-hidden">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 flex items-center gap-3 mt-4">
        <img
          src={icBack}
          width={48}
          height={48}
          onClick={() => navigate(-1)}
          className="cursor-pointer active:scale-95 transition"
          alt="Back"
        />
        <h1 className="text-[20px] font-normal">Lengkapi Data Profil</h1>
      </div>

      {/* Avatar */}
      <div className="flex w-full items-center justify-center pt-1">
        <img src={icRegister} />
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-6 max-w-md space-y-5 px-4 pb-28"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block text-[16px] text-[#001A41] font-normal">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Isi Email kamu..."
            className="w-full rounded-[16px] bg-[#EFF1F4] px-4 py-3 outline-none ring-0 text-black text-[18px] placeholder:text-[#97A6B1]"
          />
          {email.length > 0 && !emailValid && (
            <p className="mt-1 text-xs text-rose-600">
              Format email tidak valid.
            </p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="mb-2 block text-[16px] text-[#001A41] font-normal">
            Username
          </label>
          <div className="flex items-center gap-2">
            <div className="grid h-12 w-12 place-content-center rounded-[16px] bg-[#EFF1F4] text-black text-[18px] placeholder:text-[#97A6B1]">
              @
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/^@+/, ""))}
              placeholder="Bikin Username kamu.."
              className="flex-1 rounded-[16px] bg-[#EFF1F4] px-4 py-3 outline-none text-black text-[18px] placeholder:text-[#97A6B1]"
            />
          </div>
          {username.length > 0 && !usernameValid && (
            <p className="mt-1 text-xs text-rose-600">
              3–20 karakter, huruf kecil/angka/_/.
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-[16px] text-[#001A41] font-normal">
            Nomor Handphone
          </label>
          <div className="flex items-center gap-2">
            <input
              value="+62"
              readOnly
              className="grid h-12 w-16 place-content-center rounded-[16px] bg-[#EFF1F4] text-center text-black text-[18px] placeholder:text-[#97A6B1]"
            />
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="81234567890"
              className="flex-1 rounded-[16px] bg-[#EFF1F4] px-4 py-3 outline-none text-black text-[18px] placeholder:text-[#97A6B1]"
            />
          </div>
          {phone.length > 0 && !phoneValid && (
            <p className="mt-1 text-xs text-rose-600">Masukkan 9–13 digit.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md px-4 pb-6 pt-3">
          <button
            onClick={() => allValid && navigate("/biometric-scan")}
            disabled={!allValid}
            className={
              "w-full rounded-full px-6 py-4 text-[20px] font-normal shadow transition disabled:cursor-not-allowed " +
              (allValid
                ? "bg-[#001A41] text-white"
                : "bg-[#DAE0E9] text-[#9CA9B9]")
            }
          >
            Buat Akun
          </button>
        </div>
      </form>
    </div>
  );
}
