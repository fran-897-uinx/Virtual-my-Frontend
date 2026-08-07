import { fetchData } from "./api";

export async function getProjects() {
  const data = await fetchData("/projects/");

  // Ensure always array
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results; // Django pagination
  }

  return [];
}

export async function getProject(id: number) {
  return fetchData(`/projects/${id}/`);
}