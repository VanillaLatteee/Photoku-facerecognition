import { Photo } from "../lib/api";

export function PhotoCard({
  photo,
  onClick,
}: {
  photo: Photo;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block overflow-hidden rounded-xl bg-slate-100"
    >
      <img
        src={photo.thumb_url || photo.url}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[3/4] object-cover"
        alt=""
      />
    </button>
  );
}

export function PhotoSkeleton() {
  return (
    <div className="w-full aspect-[3/4] animate-pulse rounded-xl bg-slate-200" />
  );
}
