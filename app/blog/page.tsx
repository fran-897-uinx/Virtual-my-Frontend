"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getBlogs } from "@/services/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, CalendarDays, ArrowRight } from "lucide-react";

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
    getBlogs()
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
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
      <main className="min-h-screen pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Thoughts, tutorials, and insights on software development
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 backdrop-blur-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            {categories.length > 0 && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 backdrop-blur-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-16 w-full" />
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
                  className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href={`/blog/${blog.slug || blog.id}`}>
                    {blog.image ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center">
                        <span className="text-4xl opacity-30">📝</span>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {blog.published_date && (
                          <span className="flex items-center gap-1">
                            <CalendarDays size={12} />
                            {new Date(blog.published_date).toLocaleDateString()}
                          </span>
                        )}
                        {blog.category && (
                          <>
                            <span>·</span>
                            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                              {blog.category}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
                        {blog.title}
                      </h2>
                      {blog.summary && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                          {blog.summary.replace(/<[^>]+>/g, "")}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 mt-4 text-sm text-blue-500 font-medium group-hover:gap-2 transition-all">
                        Read more <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {search || selectedCategory ? "No articles match your filters." : "No blog posts available yet."}
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
