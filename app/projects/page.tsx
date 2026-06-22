"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/project";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Project {
  id: number;
  title: string;
  description: string;
  github_link?: string;
  live_link?: string;
  tech_stack: string[];
  colaborators: string[];
  state: "not_started" | "in_progress" | "completed";
  image: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data || []))
      .catch((err) => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  function getStateColor(state: string) {
    switch (state) {
      case "not_started": return "bg-red-500";
      case "in_progress": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  }

  const techCounts = new Map<string, number>();
  projects.forEach((p) => (p.tech_stack || []).forEach((t) => techCounts.set(t, (techCounts.get(t) || 0) + 1)));
  const allTechs = [...techCounts.keys()];

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchState = !filterState || p.state === filterState;
    return matchSearch && matchState;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Real-world applications I have built and contributed to
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 backdrop-blur-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 backdrop-blur-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="not_started">Not Started</option>
            </select>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {project.image ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                        <span className={`h-2 w-2 rounded-full ${getStateColor(project.state)}`} />
                        {project.state.replace("_", " ")}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center">
                      <span className="text-4xl opacity-30">💻</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    {project.tech_stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech_stack.slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack.length > 4 && (
                          <span className="text-xs text-gray-500">+{project.tech_stack.length - 4}</span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      {project.github_link && (
                        <Link href={project.github_link} target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                          <Github size={18} />
                        </Link>
                      )}
                      {project.live_link && (
                        <Link href={project.live_link} target="_blank" className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                          <ExternalLink size={18} />
                        </Link>
                      )}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="ml-auto text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {search || filterState ? "No projects match your filters." : "No projects available yet."}
              </p>
            </div>
          )}
        </section>
      </main>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-sm">
                  <span className={`h-2 w-2 rounded-full ${getStateColor(selectedProject.state)}`} />
                  {selectedProject.state.replace("_", " ")}
                </DialogDescription>
              </DialogHeader>
              {selectedProject.image && (
                <div className="mt-4">
                  <Image src={selectedProject.image} alt={selectedProject.title} width={800} height={400} className="w-full h-48 md:h-64 object-cover rounded-xl" />
                </div>
              )}
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedProject.description}</p>
                </div>
                {selectedProject.tech_stack?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProject.colaborators?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Collaborators</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.colaborators.map((person, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">{person}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-4 pt-2">
                  {selectedProject.github_link && (
                    <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md shadow-md transition flex items-center gap-2">
                      <Github size={16} /> GitHub
                    </a>
                  )}
                  {selectedProject.live_link && (
                    <a href={selectedProject.live_link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition flex items-center gap-2">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
