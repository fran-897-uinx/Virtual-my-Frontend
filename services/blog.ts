import { fetchData } from "./api";

export async function getBlogs() {
  return fetchData("/blogs/");
}

export async function getBlog(slug: string) {
  return fetchData(`/blogs/${slug}/`);
}

export async function fetchExternalBlogs() {
  return fetchData("/blogs/external-blogs/");
}
