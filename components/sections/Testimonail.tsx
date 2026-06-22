"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchData } from "@/services/api";
import { AiOutlineEdit } from "react-icons/ai";
import { createTestimonial } from "@/services/testimonail";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export interface Testimonial {
  id: number;
  avatar?: string;
  name: string;
  role: string;
  testimonial: string;
}

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    avatar: File | null;
    role: string;
    testimonial: string;
  }>({
    name: "",
    avatar: null,
    role: "",
    testimonial: "",
  });
  const [preview, setPreview] = useState<string | null>(null);


  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    if (!formData.avatar) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.avatar]);

  useEffect(() => {
    fetchData("/testimonials/")
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
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
    if (formData.avatar) data.append("avatar", formData.avatar);
    try {
      setLoading(true);
      await createTestimonial(data);
      const newData = await fetchData("/testimonials/");
      setTestimonials(newData);
      setFormData({ name: "", role: "", testimonial: "", avatar: null });
      setPreview(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Network error.");
      setLoading(false);
    }
  };

  return (
    <section id="testi" className="bg-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
            <Terminal size={14} />
            <span>~/testimonials $</span>
          </div>
          <h2 className={`${mono.className} text-3xl md:text-5xl font-bold text-green-400`}>
            $ cat ./reviews/*
          </h2>
          <p className={`${mono.className} text-green-600/60 text-sm mt-1`}>
            # what people say about working with me
          </p>
        </motion.div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id} className="basis-full sm:basis-1/2 md:basis-1/3">
                <motion.div
                  className="bg-gray-900/40 border border-green-500/20 hover:border-green-400/40 p-6 flex flex-col text-center h-full transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <p className={`${mono.className} text-green-600/80 italic line-clamp-3 mb-4 text-sm leading-relaxed`}>
                    &ldquo;{t.testimonial}&rdquo;
                  </p>
                  <h3 className={`${mono.className} text-lg font-semibold text-green-300`}>
                    {t.name}
                  </h3>
                  <p className={`${mono.className} text-sm text-green-600/60`}>
                    {t.role}
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block text-green-500 border-green-500/30" />
          <CarouselNext className="hidden md:block text-green-500 border-green-500/30" />
        </Carousel>

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
              <p className={`${mono.className} text-green-600/70 text-sm`}>
                # share your experience working with me
              </p>
            </DialogDescription>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`${mono.className} w-full border border-green-500/30 bg-gray-900 text-green-400 placeholder-green-700/50 p-2 focus:outline-none focus:border-green-400`}
              />
              <input
                type="text"
                placeholder="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className={`${mono.className} w-full border border-green-500/30 bg-gray-900 text-green-400 placeholder-green-700/50 p-2 focus:outline-none focus:border-green-400`}
              />
              <textarea
                rows={4}
                placeholder="testimonial"
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                className={`${mono.className} w-full border border-green-500/30 bg-gray-900 text-green-400 placeholder-green-700/50 p-2 focus:outline-none focus:border-green-400`}
              />
              <Button
                type="submit"
                disabled={loading}
                className={`${mono.className} w-full bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50`}
              >
                {loading ? "submitting..." : "$ ./submit.sh"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
