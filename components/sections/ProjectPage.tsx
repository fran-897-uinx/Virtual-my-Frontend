"use client";

import * as React from "react";
import { fetchData } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  github_link: string;
  live_link: string;
  tech_stack?: string[] | string;
}

// ✅ Custom styles for techs
const techStyles: Record<string, string> = {
  React: "bg-blue-100 text-blue-700",
  "Next.js": "bg-black text-white",
  Tailwind: "bg-sky-100 text-sky-600",
  TypeScript: "bg-blue-200 text-blue-900",
  Django: "bg-green-100 text-green-700",
  Python: "bg-yellow-100 text-yellow-700",
  Bootstrap: "bg-purple-100 text-purple-700",
  "Html:5": "bg-orange-100 text-orange-700",
  Css3: "bg-blue-100 text-blue-800",
  

};

export default function ProjectPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  React.useEffect(() => {
    async function loadProjects() {
      const data = await fetchData("/projects/");
      setProjects(data);
    }
    loadProjects();
  }, []);

  return (
    <main id="projects" className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>

      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project) => {
            // Normalize tech stack
            let techStack: string[] = [];
            if (Array.isArray(project.tech_stack)) {
              techStack = project.tech_stack;
            } else if (typeof project.tech_stack === "string") {
              techStack = project.tech_stack.split(",").map((t) => t.trim());
            }

            return (
              <CarouselItem
                key={project.id}
                className="basis-full md:basis-1/2 lg:basis-1/3 p-4 cursor-pointer"
              >
                <Card className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
                  {/* Project Image */}
                  <div className="relative w-full h-64">
                    <Image
                      src={project.image || "/placeholder.png"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Tech Stack (Hides on Hover) */}
                  <div
                    className="absolute bottom-2 left-5 flex flex-wrap gap-2 z-10 transition-all duration-500
                               group-hover:opacity-0 group-hover:translate-y-4 justify-center"
                  >
                    {techStack.map((tech, i) => {
                      const style =
                        techStyles[tech] ||
                        "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-300";
                      return (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs rounded-md font-medium shadow ${style}`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100
                               transition duration-500 flex flex-col justify-center items-center text-center p-4"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="flex gap-3">
                      <Button asChild variant="outline" className="text-white border-white">
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                      <Button asChild variant="default">
                        <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
