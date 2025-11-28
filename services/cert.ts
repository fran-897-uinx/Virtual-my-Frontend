import { fetchData } from "./api";

// Fetch all certificates
export async function getCertificates() {
  const data = await fetchData("/projects/certificates/");

  // Ensure always returns an array
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results; // Django pagination
  return [];
}

// Fetch single project by slug
export async function getProject(slug: string) {
  return fetchData(`/projects/${slug}/`);
}
