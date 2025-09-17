export const API_BASE = import.meta.env.VITE_API_BASE || 'http://10.10.1.15:3000';

export type Photo = {
  imageId: string;
  url: string;       // /files/.. (relative)
  thumb_url: string; // /files/.. (relative)
};

export async function fetchPhotos(eventId: string) {
  const r = await fetch(`/photos?eventId=${encodeURIComponent(eventId)}`);
  if (!r.ok) throw new Error('Gagal ambil foto');
  return r.json() as Promise<{ eventId: string; photos: Photo[] }>;
}

export async function indexImage(params: { eventId: string; imageId: string; file: File }) {
  const form = new FormData();
  form.append('image', params.file);
  const r = await fetch(`/index?eventId=${encodeURIComponent(params.eventId)}&imageId=${encodeURIComponent(params.imageId)}`, {
    method: 'POST',
    body: form
  });
  if (!r.ok) throw new Error('Gagal index');
  return r.json();
}

export async function searchBySelfie(params: { eventId: string; file: File; topN?: number; minSim?: number; threshold?: number; }) {
  const q = new URLSearchParams({
    eventId: params.eventId,
    topN: String(params.topN ?? 20),
    offset: '0',
    minSim: String(params.minSim ?? 0.4),
    threshold: String(params.threshold ?? 0.5)
  });
  const form = new FormData();
  form.append('image', params.file);
  const r = await fetch(`/search?${q.toString()}`, { method: 'POST', body: form });
  if (!r.ok) throw new Error('Gagal search');
  return r.json();
}