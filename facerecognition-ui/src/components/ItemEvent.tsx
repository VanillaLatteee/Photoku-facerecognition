import "swiper/css";
import React from "react";

type Img = { src: string; alt?: string };
const ItemEvent: React.FC<{
  img: Img;
  rs: number;
  cs: number;
  onClick?: () => void;
  clickable?: boolean;
}> = ({ img, rs, cs, onClick, clickable }) => (
  <div
    className={`overflow-hidden rounded-[16px] bg-gray-100 shadow-sm ${clickable ? "cursor-pointer" : ""}`}
    style={{
      gridRow: `span ${rs} / span ${rs}`,
      gridColumn: `span ${cs} / span ${cs}`,
    }}
    onClick={onClick}
    role={clickable ? "button" : undefined}
    tabIndex={clickable ? 0 : undefined}
    onKeyDown={
      clickable
        ? (e) => {
            if (e.key === "Enter" || e.key === " ") onClick?.();
          }
        : undefined
    }
  >
    <img
      src={img.src}
      alt={img.alt ?? ""}
      className="block h-full w-full object-cover"
      loading="lazy"
    />
  </div>
);

export default ItemEvent;
