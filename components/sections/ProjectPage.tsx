"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { getProjects } from "@/services/project";
import { BsGithub } from "react-icons/bs";
import {
  SiDjango,
  SiReact,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiWireshark,
  SiCss3,
  SiWireguard,
  SiNextdotjs,
  SiLua,
  SiFastapi,
  SiJinja,
} from "react-icons/si";
import { BsWindow } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IconType } from "react-icons/lib";
import { Terminal, ExternalLink } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export interface Project {
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

type TechIcon = {
  icon: IconType;
  color: string;
  bg: string;
};

const techIcons: Record<string, TechIcon> = {
  Django: { icon: SiDjango, color: "text-green-500", bg: "bg-green-900/30" },
  React: { icon: SiReact, color: "text-sky-500", bg: "bg-sky-900/30" },
  JavaScript: { icon: SiJavascript, color: "text-yellow-500", bg: "bg-yellow-900/30" },
  Python: { icon: SiPython, color: "text-blue-500", bg: "bg-blue-900/30" },
  Html5: { icon: SiHtml5, color: "text-orange-400", bg: "bg-orange-900/30" },
  Tailwindcss: { icon: SiTailwindcss, color: "text-cyan-500", bg: "bg-cyan-900/30" },
  PostgreSQL: { icon: SiPostgresql, color: "text-indigo-400", bg: "bg-indigo-900/30" },
  Docker: { icon: SiDocker, color: "text-blue-600", bg: "bg-blue-900/30" },
  Bash: { icon: SiLinux, color: "text-gray-400", bg: "bg-gray-800/30" },
  Powershell: { icon: BsWindow, color: "text-blue-400", bg: "bg-blue-900/30" },
  Tshark: { icon: SiWireshark, color: "text-blue-400", bg: "bg-blue-900/30" },
  Wireshark: { icon: SiWireshark, color: "text-blue-400", bg: "bg-blue-900/30" },
  Css3: { icon: SiCss3, color: "text-blue-400", bg: "bg-blue-900/30" },
  Wiregurad: { icon: SiWireguard, color: "text-gray-100", bg: "bg-red-900/30" },
  Nextjs: { icon: SiNextdotjs, color: "text-gray-400", bg: "bg-gray-800/30" },
  Lua: { icon: SiLua, color: "text-blue-400", bg: "bg-blue-900/30" },
  Fastapi: { icon: SiFastapi, color: "text-[#009688]", bg: "bg-[#005A51]/30" },
  Jinja2: { icon: SiJinja, color: "text-[#A50808]", bg: "bg-[#eeecb8]/30" },
};

function getStateIndicator(state: string) {
  switch (state) {
    case "not_started": return "[   ]";
    case "in_progress": return "[~]";
    case "completed": return "[x]";
    default: return "[?]";
  }
}

export default function ProjectPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getProjects()
      .then((data) => setProjects(data || []))
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem key={`skeleton-${index}`} className="basis-full sm:basis-1/2 lg:basis-1/3">
      <div className="bg-gray-900/50 border border-green-500/10 h-full p-4 space-y-4">
        <Skeleton className="h-40 w-full rounded-none bg-gray-900" />
        <Skeleton className="h-6 w-2/3 bg-gray-900" />
        <Skeleton className="h-4 w-1/2 bg-gray-900" />
        <Skeleton className="h-12 w-full bg-gray-900" />
      </div>
    </CarouselItem>
  ));

  return (
    <section id="projects" className="bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/projects $</span>
            </div>
            <h2 className={`${mono.className} text-3xl md:text-5xl font-bold text-green-400`}>
              $ ls ./repos/
            </h2>
            <p className={`${mono.className} text-green-600/60 text-sm mt-1`}>
              # real-world applications I have built
            </p>
          </motion.div>
          <Link
            href="/projects"
            className={`${mono.className} text-sm text-green-500/80 hover:text-green-400 underline underline-offset-4`}
          >
            $ ls ./all/
          </Link>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {loading
              ? skeletonItems
              : projects.length > 0
                ? projects.map((project) => (
                    <CarouselItem key={project.id} className="basis-full sm:basis-1/2 lg:basis-1/3 m-1.5">
                      <div className="bg-gray-900/40 border border-green-500/20 hover:border-green-400/40 h-full transition-all duration-300">
                        {project.image ? (
                          <div className="relative h-44 w-full overflow-hidden border-b border-green-500/10">
                            <Image src={project.image} alt={project.title} width={800} height={400} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            <div className={`${mono.className} absolute top-3 right-3 text-[10px] bg-background/80 text-green-500 px-2 py-1 border border-green-500/30`}>
                              {getStateIndicator(project.state)}
                            </div>
                          </div>
                        ) : (
                          <div className="h-44 bg-gray-900 border-b border-green-500/10 flex items-center justify-center">
                            <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                          </div>
                        )}
                        <div className="p-5">
                          <div className={`${mono.className} text-green-600/50 text-xs mb-2`}>$ ./repos/{project.id}/</div>
                          <h3 className={`${mono.className} text-green-300 font-semibold text-base mb-2 line-clamp-1`}>
                            {project.title || "Untitled Project"}
                          </h3>
                          <p className={`${mono.className} text-green-600/70 text-xs line-clamp-2 mb-4 leading-relaxed`}>
                            {project.description || "No description available."}
                          </p>
                          {project.tech_stack?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.tech_stack.slice(0, 4).map((tech, idx) => {
                                const techData = techIcons[tech];
                                const Icon = techData?.icon;
                                return (
                                  <span key={idx} className={`${mono.className} text-[10px] bg-gray-900 border border-green-500/20 text-green-500 px-2 py-0.5 flex items-center gap-1`}>
                                    {Icon && <Icon size={10} />}
                                    {tech}
                                  </span>
                                );
                              })}
                              {project.tech_stack.length > 4 && (
                                <span className={`${mono.className} text-[10px] text-green-600/50`}>+{project.tech_stack.length - 4}</span>
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-3 pt-2 border-t border-green-500/10">
                            {project.github_link && (
                              <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-green-600/60 hover:text-green-400 transition-colors">
                                <BsGithub size={16} />
                              </a>
                            )}
                            {project.live_link && (
                              <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-green-600/60 hover:text-green-400 transition-colors">
                                <ExternalLink size={16} />
                              </a>
                            )}
                            <Dialog>
                              <DialogTrigger className={`${mono.className} ml-auto text-xs text-green-500/70 hover:text-green-400 bg-transparent flex items-center gap-1 cursor-pointer`}>
                                $ cat ./README
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto p-6 bg-background border border-green-500/30 rounded-none">
                                <DialogHeader>
                                  <div className={`${mono.className} text-green-500/60 text-xs mb-1`}>$ cat ./repos/{project.id}/README</div>
                                  <DialogTitle className={`${mono.className} text-2xl font-bold text-green-400`}>{project.title}</DialogTitle>
                                  <DialogDescription className={`${mono.className} flex items-center gap-2 text-sm text-green-600/70`}>
                                    <span>status: {getStateIndicator(project.state)}</span>
                                  </DialogDescription>
                                </DialogHeader>
                                {project.image && (
                                  <div className="mt-4 border border-green-500/20">
                                    <Image src={project.image} alt={project.title} width={800} height={400} className="w-full h-48 md:h-64 object-cover" />
                                  </div>
                                )}
                                <div className="mt-6 space-y-6">
                                  <div>
                                    <h3 className={`${mono.className} text-green-500 text-sm font-semibold mb-2`}>## description</h3>
                                    <p className={`${mono.className} text-green-600/80 text-sm leading-relaxed`}>{project.description}</p>
                                  </div>
                                  {project.tech_stack?.length > 0 && (
                                    <div>
                                      <h3 className={`${mono.className} text-green-500 text-sm font-semibold mb-2`}>## tech_stack</h3>
                                      <div className="flex flex-wrap gap-2">
                                        {project.tech_stack.map((tech, idx) => {
                                          const techData = techIcons[tech];
                                          const Icon = techData?.icon;
                                          return (
                                            <span key={idx} className={`${mono.className} text-xs bg-gray-900 border border-green-500/20 text-green-500 px-2 py-0.5 flex items-center gap-1`}>
                                              {Icon && <Icon size={12} />}
                                              {tech}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  {project.colaborators?.length > 0 && (
                                    <div>
                                      <h3 className={`${mono.className} text-green-500 text-sm font-semibold mb-2`}>## collaborators</h3>
                                      <div className="flex flex-wrap gap-2">
                                        {project.colaborators.map((person, idx) => (
                                          <span key={idx} className={`${mono.className} text-xs text-green-600/80`}>{person}</span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex gap-4 pt-2 border-t border-green-500/10">
                                    {project.github_link && (
                                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className={`${mono.className} flex items-center gap-2 px-4 py-2 bg-gray-900 border border-green-500/30 text-green-400 hover:bg-gray-800 transition text-sm`}>
                                        <BsGithub size={16} /> github
                                      </a>
                                    )}
                                    {project.live_link && (
                                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className={`${mono.className} flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50 transition text-sm`}>
                                        <ExternalLink size={16} /> live
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                : !loading && (
                    <p className={`${mono.className} text-center text-green-600/70 w-full py-12`}>
                      projects: directory is empty
                    </p>
                  )}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex text-green-500 border-green-500/30" />
          <CarouselNext className="hidden sm:flex text-green-500 border-green-500/30" />
        </Carousel>
      </div>
    </section>
  );
}
