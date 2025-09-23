"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Next.js Image
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

interface Project {
  title: string;
  link: string;
  image?: string;
  description: string;
}

export default function ProjectPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        // Replace with your own API or static list
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // ✅ skeleton placeholders
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
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent>
          {loading
            ? skeletonItems
            : projects.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={project.link}
                    target="_blank"
                    className="block h-full"
                  >
                    <Card className="h-full shadow-sm transition rounded-2xl cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg md:text-xl">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={600} // required by Next.js
                            height={300} // required by Next.js
                            className="w-full h-40 md:h-48 object-cover rounded-xl"
                          />
                        ) : (
                          <Skeleton className="w-full h-40 md:h-48 rounded-xl" />
                        )}
                        <p className="text-gray-700 text-sm md:text-base line-clamp-3">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
