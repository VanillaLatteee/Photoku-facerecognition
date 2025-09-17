import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FullImageView: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const src = params.get("src") || "";
  const alt = params.get("alt") || "";

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  if (!src) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-black text-white">
        <div className="text-center">
          <p className="mb-4 text-lg">Image not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-white px-4 py-2 text-black shadow"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 select-none bg-black"
      style={{
        // make space for iOS notches when present
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Back button */}
      <button
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="absolute left-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
        style={{
          // keep away from the notch/safe area
          top: "max(0.75rem, env(safe-area-inset-top))",
        }}
      >
        {/* simple arrow-left icon (no external deps) */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* The image scales with object-contain for both portrait & landscape */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 m-auto h-full w-full object-contain"
        loading="eager"
        draggable={false}
      />
    </div>
  );
};

export default FullImageView;
