"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/project";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, ExternalLink, Github, Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

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

export default function ProjectsContent({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (initialProjects.length > 0) return;
    async function fetchProjects() {
      try {
        const data = await getProjects();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("getProjects failed, trying direct fetch:", err);
      }
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://code-port-backend.onrender.com/api";
        const res = await fetch(`${baseUrl}/projects/`, { cache: "no-store" });
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.results || [];
        if (list.length > 0) {
          setProjects(list);
        } else {
          setError("No projects found.");
        }
      } catch (err) {
        console.error("Direct fetch also failed:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [initialProjects.length]);

  function getStateIndicator(state: string) {
    switch (state) {
      case "not_started": return "[   ]";
      case "in_progress": return "[~]";
      case "completed": return "[x]";
      default: return "[?]";
    }
  }

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchState = !filterState || p.state === filterState;
    return matchSearch && matchState;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/projects $</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}
            >
              $ ls ./repos/
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}
            >
              # real-world applications I have built and contributed to
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mb-10"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600/50" size={18} />
              <input
                type="text"
                placeholder="grep -i 'search' ./repos/*"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${mono.className} w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-green-500/30 text-green-400 placeholder-green-700/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/30`}
              />
            </div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className={`${mono.className} px-4 py-3 rounded-none bg-gray-900 border border-green-500/30 text-green-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/30`}
            >
              <option value="">all states</option>
              <option value="completed">[x] completed</option>
              <option value="in_progress">[~] in progress</option>
              <option value="not_started">[ ] not started</option>
            </select>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="border border-green-500/10 bg-gray-900/50">
                  <Skeleton className="h-48 w-full rounded-none bg-gray-900" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-900" />
                    <Skeleton className="h-4 w-1/2 bg-gray-900" />
                    <Skeleton className="h-12 w-full bg-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className={`${mono.className} text-red-400/70 text-lg mb-2`}>error: {error}</p>
              <p className={`${mono.className} text-green-700/50 text-xs`}>check the browser console (F12) for details</p>
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
                  className="group border border-green-500/20 hover:border-green-400/50 bg-gray-900/30 transition-all duration-300"
                >
                  {project.image ? (
                    <div className="relative h-44 w-full overflow-hidden border-b border-green-500/10">
                      <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className={`${mono.className} absolute top-3 right-3 text-xs bg-gray-950/80 text-green-500 px-2 py-1 border border-green-500/30`}>
                        {getStateIndicator(project.state)} {project.state.replace("_", " ")}
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 bg-gray-900 border-b border-green-500/10 flex items-center justify-center">
                      <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`${mono.className} flex items-center gap-1 text-green-600/50 text-xs mb-2`}>
                      <span>$</span>
                      <span>./repos/{project.id}/</span>
                    </div>
                    <h2 className={`${mono.className} text-green-300 font-semibold text-base mb-2 line-clamp-1 group-hover:text-green-200 transition-colors`}>
                      {project.title}
                    </h2>
                    <p className={`${mono.className} text-green-600/80 text-xs line-clamp-2 mb-4 leading-relaxed`}>
                      {project.description}
                    </p>
                    {project.tech_stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech_stack.slice(0, 4).map((tech, i) => (
                          <span key={i} className={`${mono.className} text-[10px] bg-gray-900 border border-green-500/20 text-green-500 px-2 py-0.5`}>
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack.length > 4 && (
                          <span className={`${mono.className} text-[10px] text-green-600/50`}>+{project.tech_stack.length - 4}</span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-3 pt-2 border-t border-green-500/10">
                      {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-green-600/60 hover:text-green-400 transition-colors">
                          <Github size={16} />
                        </a>
                      )}
                      {project.live_link && (
                        <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-green-600/60 hover:text-green-400 transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className={`${mono.className} ml-auto text-xs text-green-500 hover:text-green-400`}
                      >
                        $ cat ./README
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className={`${mono.className} text-green-600/70`}>
                {search || filterState ? "No results." : "projects: directory is empty"}
              </p>
            </div>
          )}
        </section>
      </main>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto p-6 bg-gray-950 border border-green-500/30 rounded-none">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className={`${mono.className} text-green-500/60 text-xs mb-1`}>$ cat ./repos/{selectedProject.id}/README</div>
                <DialogTitle className={`${mono.className} text-2xl font-bold text-green-400`}>{selectedProject.title}</DialogTitle>
                <DialogDescription className={`${mono.className} flex items-center gap-2 text-sm text-green-600/70`}>
                  <span>status: {getStateIndicator(selectedProject.state)}</span>
                </DialogDescription>
              </DialogHeader>
              {selectedProject.image && (
                <div className="mt-4 border border-green-500/20">
                  <Image src={selectedProject.image} alt={selectedProject.title} width={800} height={400} className="w-full h-48 md:h-64 object-cover" />
                </div>
              )}
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className={`${mono.className} text-green-500 text-sm font-semibold mb-2`}>## description</h3>
                  <p className={`${mono.className} text-green-600/80 text-sm leading-relaxed`}>{selectedProject.description}</p>
                </div>
                {selectedProject.tech_stack?.length > 0 && (
                  <div>
                    <h3 className={`${mono.className} text-green-500 text-sm font-semibold mb-2`}>## tech_stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((tech, i) => (
                        <span key={i} className={`${mono.className} text-xs bg-gray-900 border border-green-500/20 text-green-500 px-2 py-0.5`}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProject.colaborators?.length > 0 && (
                  <div>
                    <h3 className={`${mono.className} text-green-500 text-sm font-semibold mb-2`}>## collaborators</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.colaborators.map((person, i) => (
                        <span key={i} className={`${mono.className} text-xs text-green-600/80`}>{person}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-4 pt-2 border-t border-green-500/10">
                  {selectedProject.github_link && (
                    <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer" className={`${mono.className} flex items-center gap-2 px-4 py-2 bg-gray-900 border border-green-500/30 text-green-400 hover:bg-gray-800 transition text-sm`}>
                      <Github size={16} /> github
                    </a>
                  )}
                  {selectedProject.live_link && (
                    <a href={selectedProject.live_link} target="_blank" rel="noopener noreferrer" className={`${mono.className} flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50 transition text-sm`}>
                      <ExternalLink size={16} /> live
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
