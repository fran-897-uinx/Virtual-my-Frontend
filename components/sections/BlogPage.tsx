"use client";

import * as React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ import skeleton
import Autoplay from "embla-carousel-autoplay";

interface Article {
  title: string;
  link: string;
  published: string;
  summary: string;
}

export default function BlogPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true); // ✅ loading state

  React.useEffect(() => {
    async function fetchRSS() {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/"
        );
        const data = await res.json();

        const mapped = data.items.map((item: Record<string, unknown>) => ({
          title: item.title,
          link: item.link,
          published: item.pubDate,
          summary: item.description,
        }));

        setArticles(mapped);
      } catch (err) {
        console.error("Error fetching RSS:", err);
      } finally {
        setLoading(false); // ✅ stop skeleton when fetch completes
      }
    }

    fetchRSS();
  }, []);

  // ✅ skeleton placeholders
  const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={`skeleton-${index}`}
      className="md:basis-1/3 lg:basis-1/3 sm:basis-1/2 basis-full"
    >
      <Card className="h-full shadow-md p-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-20 w-full" />
      </Card>
    </CarouselItem>
  ));

  return (
    <section id="blog" className="w-full py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">TechCrunch Blog</h2>
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
            : articles.map((blog, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/3 sm:basis-1/2 basis-full"
                >
                  <Link
                    href={blog.link}
                    target="_blank"
                    className="block h-full"
                  >
                    <Card className="h-full shadow-md hover:shadow-xl transition cursor-pointer">
                      <CardHeader>
                        <CardTitle>{blog.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-2">
                          {new Date(blog.published).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 line-clamp-3">
                          {blog.summary.replace(/<[^>]+>/g, "")}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious  className="hidden md:block" />
        <CarouselNext  className="hidden md:block" />
      </Carousel>
    </section>
  );
}
