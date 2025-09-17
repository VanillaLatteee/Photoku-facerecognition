export type PhotoItem = {
  imageId: string;
  url: string;
  thumb_url?: string;
};

export type PhotosResponse = {
  eventId: string;
  photos: PhotoItem[];
};

export type SearchHit = {
  imageId: string;
  url: string;
  similarity: number;
};
