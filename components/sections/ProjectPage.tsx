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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { getProjects } from "@/services/project";
import { BsGithub, BsLink, BsThreeDots } from "react-icons/bs";
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
import { Button } from "../ui/button";
import { IconType } from "react-icons/lib";

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
  Django: {
    icon: SiDjango,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  React: {
    icon: SiReact,
    color: "text-sky-500",
    bg: "bg-sky-100",
  },
  JavaScript: {
    icon: SiJavascript,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  Python: {
    icon: SiPython,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  Html5: {
    icon: SiHtml5,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  Tailwindcss: {
    icon: SiTailwindcss,
    color: "text-cyan-500",
    bg: "bg-cyan-100",
  },
  PostgreSQL: {
    icon: SiPostgresql,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  Docker: {
    icon: SiDocker,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  Bash: {
    icon: SiLinux,
    color: "text-gray-600",
    bg: "bg-gray-100",
  },
  Powershell: {
    icon: BsWindow,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  Tshark: {
    icon: SiWireshark,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  Wireshark: {
    icon: SiWireshark,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  Css3: {
    icon: SiCss3,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  Wiregurad: {
    icon: SiWireguard,
    color: "text-gray-100",
    bg: "bg-red-600",
  },
  Nextjs: {
    icon: SiNextdotjs,
    color: "text-gray-100",
    bg: "bg-gray-600",
  },
  Lua: {
    icon: SiLua,
    color: "text-blue-100",
    bg: "bg-blue-600",
  },
};
export default function ProjectPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  function getImageUrl(url: string | null) {
    return url || "/file.png";
  }

  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getProjects()
      .then((data) => setProjects(data || [])) // always an array
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  function getStateColor(state: string) {
    switch (state) {
      case "not_started":
        return "bg-red-500";
      case "in_progress":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  }
  function formatState(state: string) {
    return state.replace("_", " ");
  }
  // Skeletons
  const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={`skeleton-${index}`}
      className="basis-full sm:basis-1/2 lg:basis-1/3"
    >
      <Card className="h-full shadow-sm p-4 space-y-4 rounded-2xl">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-12 w-full" />
      </Card>
    </CarouselItem>
  ));

  return (
    <section id="projects" className="w-full py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
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
                  <CarouselItem
                    key={project.id}
                    className=" basis-full sm:basis-1/2 lg:basis-1/3 m-1.5"
                  >
                    <Card className="h-full shadow-md flex flex-col backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/20 rounded-3xl p-6 hover:scale-[1.01] transition-transform cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-bold line-clamp-1">
                          {project.title || "Untitled Project"}
                        </CardTitle>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span
                            className={`h-2 w-2 rounded-full ${getStateColor(project.state)}`}
                          />
                          {formatState(project.state)}
                        </div>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-3 flex-grow ">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={400}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        ) : (
                          <Skeleton className="w-full h-64 rounded-xl" />
                        )}

                        <p className="text-gray-500 text-sm md:text-base line-clamp-3">
                          {project.description || "No description available."}
                        </p>

                        {/* Tech stack as comma-separated string */}
                        {project.tech_stack?.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                              Tech Stack
                            </h3>

                            <div className="flex flex-wrap gap-3">
                              {project.tech_stack.map((tech, idx) => {
                                const techData = techIcons[tech];
                                const Icon = techData?.icon;

                                return (
                                  <div
                                    key={idx}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
            ${techData?.bg || "bg-gray-200"} ${techData?.color || "text-gray-700"}`}
                                  >
                                    {Icon && <Icon size={14} />}
                                    {tech}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 mt-2">
                          {project.github_link && (
                            <Link
                              href={project.github_link}
                              target="_blank"
                              className="hover:underline text-sm flex items-center gap-1 hover:bg-blue-900 cursor-pointer rounded-md px-2 py-1"
                            >
                              GitHub <BsGithub />
                            </Link>
                          )}
                          {project.live_link && (
                            <Link
                              href={project.live_link}
                              target="_blank"
                              className="text-green-600 flex items-center gap-1 text-md hover:bg-blue-900 cursor-pointer rounded-md px-2 py-1"
                            >
                              Live <BsLink />
                            </Link>
                          )}
                          <Dialog>
                            <DialogTrigger className="w-full  justify-end bg-transparent text-white flex items-center gap-2 cursor-pointer hover:bg-blue-900 rounded-md px-2 py-1">
                              Details <BsThreeDots />
                            </DialogTrigger>

                            <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl">
                              {/* HEADER */}
                              <DialogHeader className="space-y-2">
                                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                  {project.title || "Untitled Project"}
                                </DialogTitle>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span
                                    className={`h-2 w-2 rounded-full ${getStateColor(project.state)}`}
                                  />
                                  {project.state.replace("_", " ")}
                                </div>
                              </DialogHeader>

                              {/* IMAGE */}
                              <div className="mt-4">
                                <Image
                                  src={project.image || "/file.png"}
                                  alt={project.title || "Project image"}
                                  width={800}
                                  height={400}
                                  className="w-full h-48 md:h-64 object-cover rounded-xl"
                                />
                              </div>

                              {/* DESCRIPTION */}
                              <div className="mt-6">
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                  Description
                                </h3>

                                <DialogDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {project.description ||
                                    "No description available."}
                                </DialogDescription>
                              </div>

                              {/* TECH STACK */}
                              {project.tech_stack?.length > 0 && (
                                <div className="mt-6">
                                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Tech Stack
                                  </h3>

                                  <div className="flex flex-wrap gap-3">
                                    {project.tech_stack.map((tech, idx) => {
                                      const techData = techIcons[tech];
                                      const Icon = techData?.icon;

                                      return (
                                        <div
                                          key={idx}
                                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
            ${techData?.bg || "bg-gray-200"} ${techData?.color || "text-gray-700"}`}
                                        >
                                          {Icon && <Icon size={14} />}
                                          {tech}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* COLLABORATORS */}
                              {project.colaborators?.length > 0 && (
                                <div className="mt-6">
                                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Collaborators
                                  </h3>

                                  <div className="flex flex-wrap gap-2">
                                    {project.colaborators.map((person, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 text-xs rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                      >
                                        {person}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* LINKS */}
                              <div className="flex gap-4 mt-8">
                                {project.github_link && (
                                  <a
                                    href={project.github_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md shadow-md transition"
                                  >
                                    GitHub
                                  </a>
                                )}

                                {project.live_link && (
                                  <a
                                    href={project.live_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition"
                                  >
                                    Live Demo
                                  </a>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              : !loading && (
                  <p className="text-center text-gray-500 w-full">
                    Projects are loading at the moment.......
                  </p>
                )}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
