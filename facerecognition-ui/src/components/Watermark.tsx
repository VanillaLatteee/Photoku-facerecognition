import React from "react";
import watermark from "../assets/illustrations/watermark.png";

type WatermarkProps = {
  opacity?: string; // contoh: "opacity-10"
};

const Watermark: React.FC<WatermarkProps> = ({ opacity = "opacity-20" }) => {
  return (
    <div className={`absolute inset-0 z-10 flex items-center justify-center`}>
      <img
        src={watermark}
        alt="watermark"
        className={`w-full h-full object-contain ${opacity} pointer-events-none select-none`}
      />
    </div>
  );
};

export default Watermark;
