// src/hooks/useApi.ts
import { useState, useCallback } from "react";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://10.10.1.15:3000";

export type Photo = {
  imageId: string;
  url: string;       // /files/.. (relative)
  thumb_url: string; // /files/.. (relative)
};

type PhotosResponse = { eventId: string; photos: Photo[] };
type ApiError = string | null;

export function usePhotos(eventId: string) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${API_BASE}/photos?eventId=${encodeURIComponent(eventId)}`);
      if (!r.ok) throw new Error("Gagal ambil foto");
      const data: PhotosResponse = await r.json();
      setPhotos(data.photos);
    } catch (e: any) {
      setError(e.message ?? "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  return { photos, loading, error, fetchPhotos };
}

export function useIndexImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>(null);
  const [result, setResult] = useState<any>(null);

  const indexImage = useCallback(async (params: { eventId: string; imageId: string; file: File }) => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("image", params.file);
      const r = await fetch(
        `${API_BASE}/index?eventId=${encodeURIComponent(params.eventId)}&imageId=${encodeURIComponent(params.imageId)}`,
        { method: "POST", body: form }
      );
      if (!r.ok) throw new Error("Gagal index");
      const data = await r.json();
      setResult(data);
      return data;
    } catch (e: any) {
      setError(e.message ?? "Terjadi kesalahan");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { indexImage, loading, error, result };
}

export function useSearchBySelfie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>(null);
  const [results, setResults] = useState<any>(null);

  const searchBySelfie = useCallback(async (params: {
    eventId: string;
    file: File;
    topN?: number;
    minSim?: number;
    threshold?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams({
        eventId: params.eventId,
        topN: String(params.topN ?? 20),
        offset: "0",
        minSim: String(params.minSim ?? 0.4),
        threshold: String(params.threshold ?? 0.5),
      });
      const form = new FormData();
      form.append("image", params.file);
      const r = await fetch(`${API_BASE}/search?${q.toString()}`, {
        method: "POST",
        body: form,
      });
      if (!r.ok) throw new Error("Gagal search");
      const data = await r.json();
      setResults(data);
      return data;
    } catch (e: any) {
      setError(e.message ?? "Terjadi kesalahan");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchBySelfie, loading, error, results };
}