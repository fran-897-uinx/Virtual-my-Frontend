import { fetchData } from "./api";

export async function getProjects() {
  const data = await fetchData("/projects/");

  // Ensure it's always an array
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.results)) {
    return data.results; // in case Django paginates
  }
  return [];
}

export async function getProject(slug: string) {
  return fetchData(`/projects/${slug}/`);
}
