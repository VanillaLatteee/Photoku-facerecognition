// src/screens/profile/BiometricData.tsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BiometricData() {
    const navigate = useNavigate();

    const dummyJson = {
        "Nama Lengkap": "Andi Prasetyo",
        "Wajah Terdaftar Pada": "2025–05–06 13:45",
        "Status Pendaftaran": "Berhasil",
        "Status Pemeriksaan Liveness": "Lolos",
        "Kualitas Gambar": "Baik",
    };

    return (
        <div className="min-h-screen px-4 pt-6 pb-24">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft className="text-[#001A41]" />
                </button>
                <h1 className="text-lg font-semibold">Data Wajah Biometrik</h1>
            </div>

            {/* JSON Display Box */}
            <div className="rounded-xl bg-[#FAFAFA] border px-4 py-3 font-mono text-sm leading-relaxed text-gray-800">
                <pre className="whitespace-pre-wrap">
                    {`{
  `}
                    <span className="text-orange-600">"Nama Lengkap"</span>:{" "}
                    <span className="text-green-600">"${dummyJson["Nama Lengkap"]}"</span>,{`\n  `}
                    <span className="text-orange-600">"Wajah Terdaftar Pada"</span>:{" "}
                    <span className="text-green-600">"${dummyJson["Wajah Terdaftar Pada"]}"</span>,{`\n  `}
                    <span className="text-orange-600">"Status Pendaftaran"</span>:{" "}
                    <span className="text-green-600">"${dummyJson["Status Pendaftaran"]}"</span>,{`\n  `}
                    <span className="text-orange-600">"Status Pemeriksaan Liveness"</span>:{" "}
                    <span className="text-green-600">"${dummyJson["Status Pemeriksaan Liveness"]}"</span>,{`\n  `}
                    <span className="text-orange-600">"Kualitas Gambar"</span>:{" "}
                    <span className="text-green-600">"${dummyJson["Kualitas Gambar"]}"</span>
                    {`\n}`}
                </pre>
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/onboarding");
                    }}
                    className="w-full max-w-xs bg-[#001A41] text-white text-sm font-medium py-3 rounded-full"
                >
                    Hapus Data Biometrik
                </button>
            </div>
        </div>
    );
}