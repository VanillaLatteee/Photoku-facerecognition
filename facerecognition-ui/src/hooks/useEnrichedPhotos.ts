import { useEffect, useState } from "react";

export type RawPhoto = { id: number | string; src: string };
export type GridPhoto = RawPhoto & {
  ratio: string;
  cols: number;
  rows: number;
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

function simplifyRatio(w: number, h: number) {
  const g = gcd(w, h) || 1;
  return `${Math.round(w / g)} / ${Math.round(h / g)}`; // e.g. "4 / 3"
}

function chooseSpans(w: number, h: number) {
  const r = w / h;
  if (r >= 1.45) return { cols: 2, rows: 1 }; // wide landscape
  if (r <= 0.75) return { cols: 1, rows: 2 }; // tall portrait
  return { cols: 1, rows: 1 }; // near-square
}

function getNaturalSize(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    // optional but safe defaults:
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = () =>
      resolve({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 });
    img.onerror = () => resolve({ w: 1, h: 1 });
    img.src = src;
  });
}

export function useEnrichedPhotos(raw: RawPhoto[]) {
  const [items, setItems] = useState<GridPhoto[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const enriched = await Promise.all(
        raw.map(async (p) => {
          const { w, h } = await getNaturalSize(p.src);
          const ratio = simplifyRatio(w, h);
          const spans = chooseSpans(w, h);
          return { ...p, ratio, ...spans };
        })
      );
      if (!cancelled) setItems(enriched);
    })();

    return () => {
      cancelled = true;
    };
  }, [raw]);

  return items;
}
