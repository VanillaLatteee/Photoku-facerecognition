import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNaturalSize,
  spanForItemEvent,
  spanForItemEventMore,
} from "../utils/SwiperMosaicUtils";
import ItemEvent from "./ItemEvent";
import { icLike, icUnLike } from "../assets/icons";
import ItemEventMore from "./ItemEventMore";

type Img = { src: string; alt?: string };
type Props = {
  panels: Img[] | Img[][];
  columns?: 2 | 5;
  mode?: "default" | "more";
  item?: string;
  isLiked?: (img: Img) => boolean;
  onToggleLike?: (img: Img) => void;
  likeIconSrc?: string;
  unlikeIconSrc?: string;
  onTileClick?: (img: Img) => void;
  autoRowPx?: number;
};

export default function MosaicSwiper({
  panels,
  columns = 5,
  mode = "default",
  item = "",
  isLiked,
  onToggleLike,
  likeIconSrc = icLike,
  unlikeIconSrc = icUnLike,
  onTileClick,
  autoRowPx = 50,
}: Props) {
  const navigate = useNavigate();

  const slides: Img[][] =
    Array.isArray(panels) &&
    panels.length > 0 &&
    Array.isArray((panels as any)[0])
      ? (panels as Img[][])
      : [panels as Img[]];
  const [dims, setDims] = useState<Record<string, { w: number; h: number }>>(
    {},
  );

  useEffect(() => {
    const urls = Array.from(new Set(slides.flat().map((i) => i.src)));
    const missing = urls.filter((u) => !dims[u]);
    if (missing.length === 0) return;

    let cancelled = false;
    Promise.all(missing.map((u) => getNaturalSize(u))).then((res) => {
      if (cancelled) return;
      const patch: Record<string, { w: number; h: number }> = {};
      res.forEach((v, i) => (patch[missing[i]] = v));
      setDims((prev) => ({ ...prev, ...patch }));
    });
    return () => {
      cancelled = true;
    };
  }, [slides, dims]);

  const spanFor = columns === 2 ? spanForItemEventMore : spanForItemEvent;

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const getLiked = (img: Img) => (isLiked ? isLiked(img) : !!likedMap[img.src]);
  const toggleLike = (img: Img) => {
    if (onToggleLike) return onToggleLike(img);
    setLikedMap((prev) => ({ ...prev, [img.src]: !prev[img.src] }));
  };

  const useLikeUI = mode === "more" || !!onToggleLike || !!isLiked;

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode
      slidesPerView="auto"
      spaceBetween={24}
      className="py-3"
    >
      {slides.map((panel, i) => (
        <SwiperSlide key={i} className="w-full">
          <div
            className={`grid grid-flow-row-dense ${
              columns === 2 ? "grid-cols-2" : "grid-cols-5"
            } gap-2 [grid-auto-rows:${autoRowPx}px]`}
          >
            {panel.map((img, idx) => {
              const d = dims[img.src];
              const span = d
                ? spanFor(d.w, d.h)
                : columns === 2
                  ? { rs: 6, cs: 1 } // fallback aman untuk 2 kolom
                  : { rs: 1, cs: 1 }; // fallback untuk 5 kolom

              // Default behavior lama: kalau tidak ada onTileClick,
              // tile terakhir di slide akan navigate ke "/home/event/more"
              const isLast = idx === panel.length - 1;
              const handleClick = () => {
                if (onTileClick) return onTileClick(img);
                if (isLast && mode === "default") {
                  navigate("/home/event/more", { state: { item } });
                  return;
                }
                navigate(
                  `/photo?src=${encodeURIComponent(img.src)}&alt=${encodeURIComponent(
                    img.alt ?? "",
                  )}`,
                );
              };

              return useLikeUI ? (
                <ItemEventMore
                  key={`${img.src}-${idx}`}
                  img={img}
                  rs={span.rs}
                  cs={span.cs as 1 | 2}
                  clickable={!!handleClick}
                  onClick={handleClick}
                  isLiked={getLiked(img)}
                  onToggleLike={toggleLike}
                  likeIconSrc={likeIconSrc}
                  unlikeIconSrc={unlikeIconSrc}
                />
              ) : (
                <ItemEvent
                  key={`${img.src}-${idx}`}
                  img={img}
                  rs={span.rs}
                  cs={span.cs as 1 | 2}
                  clickable
                  onClick={handleClick}
                />
              );
            })}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
