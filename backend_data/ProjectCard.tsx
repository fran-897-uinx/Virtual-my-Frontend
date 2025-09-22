import { useEffect, useState } from "react";

// 1. Define backend response shape
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectCard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects") // 👈 your backend API
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-xl shadow-md bg-white dark:bg-gray-800 p-4"
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-lg font-bold mt-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
}
