"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import { createTestimonial } from "@/services/testimonail";
import { AiOutlineEdit } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Testimonial {
  id: number;
  avatar?: string;
  name: string;
  role: string;
  testimonial: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", testimonial: "" });

  useEffect(() => {
    fetchData("/testimonials/")
      .then((data) => setTestimonials(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.testimonial) {
      alert("Please fill all fields.");
      return;
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("testimonial", formData.testimonial);
    try {
      setSubmitting(true);
      await createTestimonial(data);
      const newData = await fetchData("/testimonials/");
      setTestimonials(newData);
      setFormData({ name: "", role: "", testimonial: "" });
      setSubmitting(false);
    } catch {
      alert("Network error.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/testimonials $</span>
            </div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}>
              $ cat ./reviews/*
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}>
              # what people say about working with me
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-900/40 border border-green-500/10 p-6 space-y-3">
                  <Skeleton className="h-16 w-full bg-gray-900" />
                  <Skeleton className="h-5 w-2/3 bg-gray-900 mx-auto" />
                  <Skeleton className="h-4 w-1/3 bg-gray-900 mx-auto" />
                </div>
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="bg-gray-900/40 border border-green-500/20 hover:border-green-400/40 p-6 flex flex-col text-center transition-all duration-300"
                >
                  <p className={`${mono.className} text-green-600/80 italic line-clamp-3 mb-4 text-sm leading-relaxed`}>
                    &ldquo;{t.testimonial}&rdquo;
                  </p>
                  <h3 className={`${mono.className} text-lg font-semibold text-green-300`}>{t.name}</h3>
                  <p className={`${mono.className} text-sm text-green-600/60`}>{t.role}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : !loading && (
            <p className={`${mono.className} text-center text-green-600/70 w-full py-12`}>testimonials: directory is empty</p>
          )}

          <Dialog>
            <div className="flex justify-end mt-8">
              <DialogTrigger asChild>
                <Button className={`${mono.className} flex items-center gap-2 bg-gray-900 border border-green-500/30 text-green-400 hover:bg-gray-800 cursor-pointer`}>
                  $ testify --add <AiOutlineEdit />
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="bg-gray-950 border border-green-500/30 text-green-400 rounded-none">
              <DialogHeader>
                <DialogTitle className={`${mono.className} text-2xl font-bold text-green-400`}>
                  $ echo &quot;your_thought&quot; &gt;&gt; ./reviews
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <p className={`${mono.className} text-green-600/70 text-sm`}># share your experience working with me</p>
              </DialogDescription>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <input type="text" placeholder="name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${mono.className} w-full border border-green-500/30 bg-gray-900 text-green-400 placeholder-green-700/50 p-2 focus:outline-none focus:border-green-400`} />
                <input type="text" placeholder="role" value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`${mono.className} w-full border border-green-500/30 bg-gray-900 text-green-400 placeholder-green-700/50 p-2 focus:outline-none focus:border-green-400`} />
                <textarea rows={4} placeholder="testimonial" value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  className={`${mono.className} w-full border border-green-500/30 bg-gray-900 text-green-400 placeholder-green-700/50 p-2 focus:outline-none focus:border-green-400`} />
                <Button type="submit" disabled={submitting}
                  className={`${mono.className} w-full bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50`}>
                  {submitting ? "submitting..." : "$ ./submit.sh"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>
      </main>
      <Footer />
    </>
  );
}
