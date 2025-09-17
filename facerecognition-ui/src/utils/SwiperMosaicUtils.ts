export function getNaturalSize(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = () =>
      resolve({ w: img.naturalWidth || 1, h: img.naturalHeight || 1 });
    img.onerror = () => resolve({ w: 1, h: 1 });
    img.src = src;
  });
}

type Span = {
  cs: 1 | 2;
  rs: number;
  ratio: number;
  orient: "landscape" | "portrait" | "square";
};

export function spanForItemEvent(w: number, h: number): Span {
  const r = w / h;
  const orient = r > 1.05 ? "landscape" : r < 0.95 ? "portrait" : "square";

  let cs: 1 | 2;
  let rs: 1 | 2;

  if (r >= 2.0) {
    cs = 2;
    rs = 1; // 2×1
  } else if (r >= 1.4) {
    cs = 2;
    rs = 2; // 2×2
  } else if (r >= 1.0) {
    cs = 1;
    rs = 1; // 1×1
  } else {
    cs = 1;
    rs = 2; // 1×2
  }

  return { cs, rs, ratio: +r.toFixed(2), orient };
}

export function spanForItemEventMore(w: number, h: number): Span {
  const r = w / h;
  const orient = r > 1.1 ? "landscape" : r < 0.9 ? "portrait" : "square";

  let cs: 1 | 2 = 1;
  let rs = 1;

  if (orient == "portrait") {
    cs = 1;
    rs = 6;
  } else if (orient == "square") {
    cs = 2;
    rs = 4;
  } else {
    cs = 2;
    rs = 6;
  }

  return { cs, rs, ratio: +r.toFixed(2), orient };
}
