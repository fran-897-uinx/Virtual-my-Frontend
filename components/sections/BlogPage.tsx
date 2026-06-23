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
import { getBlogs } from "@/services/blog";
import { motion } from "framer-motion";
import { CalendarDays, Terminal, ArrowRight } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

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
        if (rss.items && rss.items.length > 0) {
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
          setLoading(false);
          return;
        }
      } catch (rssErr) {
        console.error("TechCrunch RSS2JSON failed:", rssErr);
      }
      try {
        const rssRes = await fetch("https://techcrunch.com/feed/");
        const xml = await rssRes.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        const items = doc.querySelectorAll("item");
        const mapped = Array.from(items).map((item, i) => ({
          id: i,
          title: item.querySelector("title")?.textContent || "",
          slug: item.querySelector("link")?.textContent || "",
          published_date: item.querySelector("pubDate")?.textContent || "",
          summary: item.querySelector("description")?.textContent?.replace(/<[^>]+>/g, "").slice(0, 300) || "",
          category: "",
          image: item.querySelector("enclosure")?.getAttribute("url") || "",
        }));
        if (mapped.length > 0) {
          setArticles(mapped);
        }
      } catch (xmlErr) {
        console.error("TechCrunch RSS XML also failed:", xmlErr);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem key={`skeleton-${index}`} className="md:basis-1/3 lg:basis-1/3 sm:basis-1/2 basis-full">
      <div className="bg-gray-900/50 border border-green-500/10 h-full">
        <Skeleton className="h-44 w-full rounded-none bg-gray-900" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4 bg-gray-900" />
          <Skeleton className="h-4 w-1/3 bg-gray-900" />
          <Skeleton className="h-12 w-full bg-gray-900" />
        </div>
      </div>
    </CarouselItem>
  ));

  return (
    <section id="blog" className="bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/blog $</span>
            </div>
            <h2 className={`${mono.className} text-3xl md:text-5xl font-bold text-green-400`}>
              $ cat ./posts/*
            </h2>
            <p className={`${mono.className} text-green-600/60 text-sm mt-1`}>
              # thoughts, tutorials, and insights
            </p>
          </motion.div>
          <Link
            href="/blog"
            className={`${mono.className} text-sm text-green-500/80 hover:text-green-400 underline underline-offset-4`}
          >
            $ ls ./all/
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
                    <CarouselItem key={blog.id || index} className="md:basis-1/3 lg:basis-1/3 sm:basis-1/2 basis-full">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {(() => {
                          const isExternal = typeof blog.slug === "string" && blog.slug.startsWith("http");
                          const href = isExternal ? (blog.slug as string) : `/blog/${blog.slug || blog.id}`;
                          const Wrapper = isExternal ? "a" : Link;
                          const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
                          return (
                            <Wrapper href={href} className="block h-full" {...extraProps}>
                              <div className="bg-gray-900/40 border border-green-500/20 hover:border-green-400/40 h-full transition-all duration-300">
                                {blog.image ? (
                                  <div className="relative h-44 w-full overflow-hidden border-b border-green-500/10">
                                    <Image
                                      src={blog.image}
                                      alt={blog.title}
                                      fill
                                      className="object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-44 bg-gray-900 border-b border-green-500/10 flex items-center justify-center">
                                    <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                                  </div>
                                )}
                                <div className="p-5">
                                  {blog.published_date && (
                                    <p className={`${mono.className} text-green-600/60 text-xs mb-2 flex items-center gap-1`}>
                                      <CalendarDays size={12} />
                                      {new Date(blog.published_date).toLocaleDateString()}
                                    </p>
                                  )}
                                  <h3 className={`${mono.className} text-green-300 font-semibold text-base mb-2 line-clamp-2`}>
                                    {blog.title}
                                  </h3>
                                  {blog.summary && (
                                    <p className={`${mono.className} text-green-600/70 text-xs line-clamp-3 leading-relaxed`}>
                                      {blog.summary.replace(/<[^>]+>/g, "")}
                                    </p>
                                  )}
                                  {blog.category && (
                                    <span className={`${mono.className} inline-block mt-3 text-[10px] bg-gray-900 border border-green-500/20 text-green-500/80 px-2 py-0.5`}>
                                      {blog.category}
                                    </span>
                                  )}
                                  <span className={`${mono.className} inline-flex items-center gap-1 mt-3 text-xs text-green-500/70`}>
                                    $ cat ./post <ArrowRight size={12} />
                                  </span>
                                </div>
                              </div>
                            </Wrapper>
                          );
                        })()}
                      </motion.div>
                    </CarouselItem>
                  ))
                : !loading && (
                    <p className={`${mono.className} text-center text-green-600/70 w-full py-12`}>
                      blog: directory is empty
                    </p>
                  )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex text-green-500 border-green-500/30" />
          <CarouselNext className="hidden md:flex text-green-500 border-green-500/30" />
        </Carousel>
      </div>
    </section>
  );
}
