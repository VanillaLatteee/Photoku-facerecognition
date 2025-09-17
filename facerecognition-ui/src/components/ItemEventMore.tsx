import "swiper/css";
import React from "react";

type Img = { src: string; alt?: string };
const ItemEventMore: React.FC<{
  img: Img;
  rs: number;
  cs: number;
  onClick?: () => void;
  clickable?: boolean;
  isLiked?: boolean;
  onToggleLike?: (img: Img) => void;
  likeIconSrc?: string;
  unlikeIconSrc?: string;
}> = ({
  img,
  rs,
  cs,
  onClick,
  clickable,
  isLiked,
  onToggleLike,
  likeIconSrc,
  unlikeIconSrc,
}) => (
  <div
    className={`relative overflow-hidden rounded-[16px] bg-gray-100 shadow-sm ${
      clickable ? "cursor-pointer" : ""
    }`}
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
    <button
      type="button"
      className="absolute bottom-2 right-2 z-10 p-0"
      onClick={(e) => {
        e.stopPropagation();
        onToggleLike?.(img);
      }}
      aria-pressed={!!isLiked}
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <img
        src={isLiked ? (likeIconSrc ?? "") : (unlikeIconSrc ?? "")}
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        loading="lazy"
        draggable={false}
      />
    </button>
  </div>
);

export default ItemEventMore;
