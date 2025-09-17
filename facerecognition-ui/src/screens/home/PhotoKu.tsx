import { useState } from "react";
import { icScanBiometrik } from "../../assets/icons";
import {
  SamplePhotoku1,
  SamplePhotoku2,
  SamplePhotoku3,
  SamplePhotokuEmpty1,
  SamplePhotokuEmpty2,
  SamplePhotokuEmpty3,
} from "../../assets/photoku";

import Explore from "./photoku/explore";
import Collection from "./photoku/collection";
const Photoku = () => {
  const [menu, setMenu] = useState("Explore");

  return (
    <div className="">
      {/* Tab Explore & Koleksi Saya */}
      <div className="fixed inset-x-0 top-[var(--topbar-h)] z-40 bg-white py-4">
        <div className="grid grid-cols-2 text-center">
          {/* Explore */}
          <div
            className={`relative cursor-pointer ${
              menu === "Explore"
                ? "font-semibold text-black after:content-[''] after:block after:w-16 after:h-0.5 after:bg-black after:mx-auto after:mt-1"
                : "text-gray-400"
            }`}
            onClick={() => setMenu("Explore")}
          >
            Explore
          </div>

          {/* Koleksi Saya */}
          <div
            className={`relative cursor-pointer ${
              menu === "Koleksi Saya"
                ? "font-semibold text-black after:content-[''] after:block after:w-16 after:h-0.5 after:bg-black after:mx-auto after:mt-1"
                : "text-gray-400"
            }`}
            onClick={() => setMenu("Koleksi Saya")}
          >
            Koleksi Saya
          </div>
        </div>
      </div>
      <div className="mt-[calc(var(--topbar-h)+4px)]">
        {menu === "Explore" ? <Explore /> : <Collection />}
      </div>
    </div>
  );
};

export default Photoku;
