export async function drawWatermark(imageUrl: string, text = "PhotoKu") {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;
  await img.decode();

  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  ctx.font = `${Math.max(16, Math.floor(img.width * 0.04))}px system-ui, -apple-system, Segoe UI, Roboto`;
  ctx.fillStyle = "rgba(230,0,18,0.35)";
  ctx.rotate((-15 * Math.PI) / 180);
  const stepX = Math.floor(img.width * 0.25);
  const stepY = Math.floor(img.height * 0.25);
  for (let y = -img.height; y < img.height * 2; y += stepY) {
    for (let x = -img.width; x < img.width * 2; x += stepX) {
      ctx.fillText(text, x, y);
    }
  }
  return c.toDataURL("image/jpeg", 0.9);
}