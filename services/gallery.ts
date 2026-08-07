import { fetchData } from "./api";

export interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  event_date?: string;
}

export async function getGalleryImages() {
  const data = await fetchData("/gallery/");

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}
