import { fetchData } from "./api";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  avatar?: string; // optional image/avatar URL
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchData("/testimonials/");
}
