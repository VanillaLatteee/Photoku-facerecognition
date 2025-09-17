import type { PhotosResponse, SearchHit } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://10.10.1.15:3000';

export async function health() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('health failed');
  return res.json();
}

export async function listPhotos(eventId: string): Promise<PhotosResponse> {
  const res = await fetch(`/photos?eventId=${encodeURIComponent(eventId)}`, { credentials: 'include' });
  if (!res.ok) throw new Error('photos failed');
  return res.json();
}

export async function indexByImage(eventId: string, image: File, imageId?: string) {
  const fd = new FormData();
  fd.append('image', image);
  if (imageId) fd.append('imageId', imageId);
  const res = await fetch(`/index?eventId=${encodeURIComponent(eventId)}`, {
    method: 'POST',
    body: fd,
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function searchBySelfie(
  eventId: string,
  selfie: File,
  topN = 20,
  minSim = 0.4,
  threshold = 0.5
): Promise<{ hits: SearchHit[] }> {
  const fd = new FormData();
  fd.append('image', selfie);
  const qs = new URLSearchParams({
    eventId,
    topN: String(topN),
    offset: '0',
    minSim: String(minSim),
    threshold: String(threshold),
  });
  const res = await fetch(`/search?${qs.toString()}`, {
    method: 'POST',
    body: fd,
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}