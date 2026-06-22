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
import { getBlogs } from "@/services/blog";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug?: string;
  content?: string;
  image?: string;
  published_date?: string;
  category?: string;
  summary?: string;
}

export default function BlogPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [articles, setArticles] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("API blogs failed, falling back to TechCrunch:", err);
      }
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/"
        );
        const rss = await res.json();
        const mapped = (rss.items || []).map((item: Record<string, unknown>, i: number) => ({
          id: i,
          title: item.title as string,
          slug: (item.link as string) || "",
          published_date: item.pubDate as string,
          summary: (item.description as string)?.replace(/<[^>]+>/g, "").slice(0, 300),
          category: Array.isArray(item.categories) ? (item.categories as string[]).join(", ") : "",
          image: (item as Record<string, unknown>).thumbnail as string || "",
        }));
        setArticles(mapped);
      } catch (rssErr) {
        console.error("TechCrunch RSS also failed:", rssErr);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={`skeleton-${index}`}
      className="md:basis-1/3 lg:basis-1/3 sm:basis-1/2 basis-full"
    >
      <Card className="h-full shadow-md p-0 space-y-0 overflow-hidden rounded-2xl">
        <Skeleton className="h-44 w-full rounded-none" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    </CarouselItem>
  ));

  return (
    <section id="blog" className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <Link
            href="/blog"
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {loading
              ? skeletonItems
              : articles.length > 0
                ? articles.map((blog, index) => (
                    <CarouselItem
                      key={blog.id || index}
                      className="md:basis-1/3 lg:basis-1/3 sm:basis-1/2 basis-full"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {(() => {
                          const isExternal = typeof blog.slug === "string" && blog.slug.startsWith("http");
                          const href = isExternal ? blog.slug : `/blog/${blog.slug || blog.id}`;
                          const Wrapper = isExternal ? "a" : Link;
                          const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
                          return (
                            <Wrapper href={href} className="block h-full" {...extraProps}>
                              <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-2xl">
                                {blog.image && (
                                  <div className="relative h-44 w-full overflow-hidden">
                                    <Image
                                      src={blog.image}
                                      alt={blog.title}
                                      fill
                                      className="object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                  </div>
                                )}
                                <CardHeader className={blog.image ? "pb-2" : ""}>
                                  <CardTitle className="line-clamp-2 text-lg">
                                    {blog.title}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  {blog.published_date && (
                                    <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                                      <CalendarDays size={12} />
                                      {new Date(blog.published_date).toLocaleDateString()}
                                    </p>
                                  )}
                                  {blog.summary && (
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                      {blog.summary.replace(/<[^>]+>/g, "")}
                                    </p>
                                  )}
                                  {blog.category && (
                                    <span className="inline-block mt-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                      {blog.category}
                                    </span>
                                  )}
                                </CardContent>
                              </Card>
                            </Wrapper>
                          );
                        })()}
                      </motion.div>
                    </CarouselItem>
                  ))
                : !loading && (
                    <p className="text-center text-gray-500 w-full py-12">
                      No blog posts available at the moment.
                    </p>
                  )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
