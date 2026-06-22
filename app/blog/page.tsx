"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getBlogs, fetchExternalBlogs } from "@/services/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, CalendarDays, ArrowRight, Terminal } from "lucide-react";
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
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
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
        const data = await fetchExternalBlogs();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
          setLoading(false);
          return;
        }
      } catch (extErr) {
        console.error("External blogs endpoint also failed:", extErr);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))] as string[];

  const filtered = articles.filter((blog) => {
    const matchSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      (blog.summary || "").toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || blog.category === selectedCategory;
    return matchSearch && matchCategory;
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
              <span>~/blog $</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}
            >
              $ cat ./posts/*
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}
            >
              # thoughts, tutorials, and insights on software development
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
                placeholder="grep -i 'search' ./posts/*"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${mono.className} w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-green-500/30 text-green-400 placeholder-green-700/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/30`}
              />
            </div>
            {categories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`${mono.className} px-4 py-3 rounded-none bg-gray-900 border border-green-500/30 text-green-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/30`}
              >
                <option value="">all categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="border border-green-500/10 bg-gray-900/50">
                  <Skeleton className="h-48 w-full rounded-none bg-gray-900" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-900" />
                    <Skeleton className="h-4 w-1/3 bg-gray-900" />
                    <Skeleton className="h-16 w-full bg-gray-900" />
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
              {filtered.map((blog, index) => (
                <motion.article
                  key={blog.id || index}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="group border border-green-500/20 hover:border-green-400/50 bg-gray-900/30 transition-all duration-300"
                >
                  {typeof blog.slug === "string" && blog.slug.startsWith("http") ? (
                    <a href={blog.slug} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {blog.image ? (
                        <div className="relative h-44 w-full overflow-hidden border-b border-green-500/10">
                          <Image src={blog.image} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      ) : (
                        <div className="h-44 bg-gray-900 border-b border-green-500/10 flex items-center justify-center">
                          <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                        </div>
                      )}
                      <div className="p-5">
                        <div className={`${mono.className} flex items-center gap-2 text-xs text-green-600/60 mb-2`}>
                          {blog.published_date && <span>{new Date(blog.published_date).toLocaleDateString()}</span>}
                          {blog.category && <><span>|</span><span>{blog.category}</span></>}
                        </div>
                        <h2 className={`${mono.className} text-green-300 font-semibold text-base mb-2 line-clamp-2 group-hover:text-green-200 transition-colors`}>
                          {blog.title}
                        </h2>
                        {blog.summary && (
                          <p className={`${mono.className} text-green-600/80 text-xs line-clamp-3 leading-relaxed`}>
                            {blog.summary.replace(/<[^>]+>/g, "")}
                          </p>
                        )}
                        <span className={`${mono.className} inline-flex items-center gap-1 mt-4 text-xs text-green-500 group-hover:text-green-400 transition-all`}>
                          $ cat ./post <ArrowRight size={12} />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <Link href={`/blog/${blog.slug || blog.id}`} className="block h-full">
                      {blog.image ? (
                        <div className="relative h-44 w-full overflow-hidden border-b border-green-500/10">
                          <Image src={blog.image} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      ) : (
                        <div className="h-44 bg-gray-900 border-b border-green-500/10 flex items-center justify-center">
                          <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                        </div>
                      )}
                      <div className="p-5">
                        <div className={`${mono.className} flex items-center gap-2 text-xs text-green-600/60 mb-2`}>
                          {blog.published_date && <span>{new Date(blog.published_date).toLocaleDateString()}</span>}
                          {blog.category && <><span>|</span><span>{blog.category}</span></>}
                        </div>
                        <h2 className={`${mono.className} text-green-300 font-semibold text-base mb-2 line-clamp-2 group-hover:text-green-200 transition-colors`}>
                          {blog.title}
                        </h2>
                        {blog.summary && (
                          <p className={`${mono.className} text-green-600/80 text-xs line-clamp-3 leading-relaxed`}>
                            {blog.summary.replace(/<[^>]+>/g, "")}
                          </p>
                        )}
                        <span className={`${mono.className} inline-flex items-center gap-1 mt-4 text-xs text-green-500 group-hover:text-green-400 transition-all`}>
                          $ cat ./post <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  )}
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className={`${mono.className} text-green-600/70`}>
                {search || selectedCategory ? "No results." : "blog: directory is empty"}
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
