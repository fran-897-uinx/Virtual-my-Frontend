import ProjectsContent from "./ProjectsContent";

export const dynamic = "force-dynamic";

async function fetchProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://code-port-backend.onrender.com/api";
    const res = await fetch(`${baseUrl}/projects/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.results || [];
    return list;
  } catch (err) {
    console.error("SSR fetch projects failed:", err);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return <ProjectsContent initialProjects={projects} />;
}
