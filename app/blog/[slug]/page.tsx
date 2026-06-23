"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlog, getBlogs, fetchExternalBlogs } from "@/services/blog";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Terminal, ArrowLeft, Calendar, User } from "lucide-react";
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
  author?: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getBlog(slug);
        if (data && data.title) {
          setPost(data);
          setLoading(false);
          return;
        }
      } catch {}
      try {
        const all = await getBlogs();
        if (Array.isArray(all)) {
          const found = all.find(
            (p: BlogPost) => p.slug === slug || String(p.id) === slug
          );
          if (found) {
            setPost(found);
            setLoading(false);
            return;
          }
        }
      } catch {}
      try {
        const external = await fetchExternalBlogs();
        if (Array.isArray(external)) {
          const found = external.find(
            (p: BlogPost) => p.slug === slug || String(p.id) === slug
          );
          if (found) {
            setPost(found);
            setLoading(false);
            return;
          }
        }
      } catch {}
      setError("Post not found.");
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-background text-foreground">
        <section className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className={`${mono.className} inline-flex items-center gap-2 text-sm text-green-600/70 hover:text-green-400 transition-colors mb-6`}
            >
              <ArrowLeft size={14} />
              $ cd ../
            </Link>

            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/blog/{slug} $</span>
            </div>
          </motion.div>

          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 rounded-none bg-gray-900" />
              <Skeleton className="h-5 w-1/3 rounded-none bg-gray-900" />
              <Skeleton className="h-64 w-full rounded-none bg-gray-900" />
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full rounded-none bg-gray-900" />
                ))}
              </div>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className={`${mono.className} text-red-400/70 text-lg mb-4`}>
                error: {error}
              </p>
              <Link
                href="/blog"
                className={`${mono.className} text-sm text-green-600/70 hover:text-green-400 transition-colors underline underline-offset-4`}
              >
                $ cd ../blog/
              </Link>
            </motion.div>
          ) : post ? (
            <motion.article
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.h1
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className={`${mono.className} text-3xl md:text-4xl font-bold text-green-300 mb-4 leading-tight`}
              >
                {post.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`${mono.className} flex flex-wrap items-center gap-4 text-xs text-green-600/60 mb-8 pb-4 border-b border-green-500/10`}
              >
                {post.published_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {new Date(post.published_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <User size={12} />
                    {post.author}
                  </span>
                )}
                {post.category && (
                  <span className="px-2 py-0.5 bg-gray-900 border border-green-500/20 text-green-500">
                    {post.category}
                  </span>
                )}
              </motion.div>

              {post.image && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="relative h-56 md:h-72 w-full mb-8 border border-green-500/20 overflow-hidden"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`${mono.className} prose prose-invert max-w-none`}
              >
                {post.content ? (
                  <div
                    className="text-green-300/90 text-sm leading-relaxed space-y-4 [&_h1]:text-green-400 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-green-400 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-green-400 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:text-green-300/80 [&_p]:mb-4 [&_pre]:bg-gray-900 [&_pre]:border [&_pre]:border-green-500/20 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4 [&_code]:text-green-400 [&_code]:bg-gray-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_a]:text-green-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-green-300 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-green-500/30 [&_blockquote]:pl-4 [&_blockquote]:text-green-500/70 [&_blockquote]:italic [&_blockquote]:my-4 [&_img]:border [&_img]:border-green-500/20 [&_img]:my-4 [&_hr]:border-green-500/10 [&_hr]:my-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                ) : post.summary ? (
                  <p className="text-green-300/80 text-sm leading-relaxed">
                    {post.summary}
                  </p>
                ) : (
                  <p className="text-green-600/50 text-sm italic">
                    # no content available for this post
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-6 border-t border-green-500/10"
              >
                <Link
                  href="/blog"
                  className={`${mono.className} inline-flex items-center gap-2 px-5 py-3 bg-gray-900 border border-green-500/30 text-green-400 hover:bg-gray-800 transition-all text-sm`}
                >
                  <ArrowLeft size={14} />
                  $ cd ../blog/
                </Link>
              </motion.div>
            </motion.article>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
