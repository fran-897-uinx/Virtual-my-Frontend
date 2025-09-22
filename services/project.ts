import { fetchData } from "./api";

export async function getProjects() {
  return fetchData("/projects/");
}

export async function getProject(slug: string) {
  return fetchData(`/projects/${slug}/`);
}
