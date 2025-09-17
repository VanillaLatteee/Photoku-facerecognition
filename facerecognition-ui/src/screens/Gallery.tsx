import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";

type Photo = { url: string; id: string };

export default function Gallery() {
  const [items, setItems] = useState<Photo[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // TODO: fetch('/photos?eventId=xxx')
      await new Promise((r) => setTimeout(r, 800));
      if (!mounted) return;
      setItems(
        Array.from({ length: 12 }).map((_, i) => ({
          id: String(i),
          url: `https://picsum.photos/seed/faceai-${i}/600/600`,
        }))
      );
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!items)
    return (
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((p) => (
        <img
          key={p.id}
          src={p.url}
          loading="lazy"
          className="rounded-xl object-cover w-full h-full"
        />
      ))}
    </div>
  );
}
