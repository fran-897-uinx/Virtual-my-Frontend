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

interface Project {
  id: number;
  title?: string;
  link?: string;
  image?: string;
  description?: string;
  github_link?: string;
  tech_stack?: string[];
  live_link?: string;
}

export default function ProjectPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
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

  function formatTechStack(stack: string[] | string | undefined) {
    if (Array.isArray(stack)) return stack.join(", ");
    if (typeof stack === "string") return stack;
    return "";
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
                    <CardHeader>
                      <CardTitle className="text-lg md:text-xl">
                        {project.title || "Untitled Project"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3 flex-grow ">
                      {project.image ? (
                        <Image
                          src={getImageUrl(project.image)}
                          alt={project.title || "Project image"}
                          width={600}
                          height={300}
                          className="w-full h-40 md:h-48 object-cover rounded-xl"
                        />
                      ) : (
                        <Skeleton className="w-full h-40 md:h-48 rounded-xl" />
                      )}

                      <p className="text-gray-500 text-sm md:text-base line-clamp-3">
                        {project.description || "No description available."}
                      </p>

                      {/* Tech stack as comma-separated string */}
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <p className="text-white-500 text-sm mt-2 uppercase font-bold">
                          Tech Stack: {formatTechStack(project.tech_stack)}
                        </p>
                      )}

                      <div className="flex gap-3 mt-2">
                        {project.github_link && (
                          <Link
                            href={project.github_link}
                            target="_blank"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            GitHub
                          </Link>
                        )}
                        {project.live_link && (
                          <Link
                            href={project.live_link}
                            target="_blank"
                            className="text-green-600 hover:underline text-sm"
                          >
                            Live Demo
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            : !loading && (
                <p className="text-center text-gray-500 w-full">
                  No projects available at the moment.
                </p>
              )}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
