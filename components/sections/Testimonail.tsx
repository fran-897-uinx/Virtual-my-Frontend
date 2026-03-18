"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchData } from "@/services/api";
import * as AiIcons from "react-icons/ai";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
const moonDance = Dancing_Script({ weight: "400", subsets: ["latin"] });
import { createTestimonial } from "@/services/testimonail";

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
import { BsQuote } from "react-icons/bs";

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

  // Generate preview for uploaded image
  useEffect(() => {
    if (!formData.avatar) {
      setPreview(null);
      return;
    }

    // Safe because we know avatar is not null
    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.avatar]);
  // Fetch existing testimonials from backend
  useEffect(() => {
    fetchData("/testimonials/")
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form submit
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

      // Optimistic update: show uploaded testimonial immediately
      // if (formData.avatar) {
      //   const avatarFile = formData.avatar;
      //   const tempAvatarUrl = URL.createObjectURL(avatarFile);

      //   setTestimonials((prev) => [
      //     ...prev,
      //     {
      //       id: Date.now(), // temporary ID
      //       name: formData.name,
      //       role: formData.role,
      //       testimonial: formData.testimonial,
      //       avatar: tempAvatarUrl,
      //     },
      //   ]);
      // }

      await createTestimonial(data);

      // Fetch from backend to get actual URLs and updated IDs
      const newData = await fetchData("/testimonials/");
      setTestimonials(newData);

      // Reset form
      setFormData({ name: "", role: "", testimonial: "", avatar: null });
      setPreview(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("⚠️ Network error.");
      setLoading(false);
    }
  };

  return (
    <section id="testi" className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">What People Say</h2>

      {/* Carousel */}
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem
              key={t.id}
              className="basis-full sm:basis-1/2 md:basis-1/3"
            >
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 shadow-lg flex flex-col  text-center h-full hover:scale-95 transition-transform duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 0.95 }}
                transition={{ duration: 1.2 }}
              >
                {/* Testimonial */}
                <p className="text-gray-600 dark:text-gray-300 italic line-clamp-3 mb-4">
                  “{t.testimonial}”
                </p>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.role}
                </p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>

      {/* Dialog Form */}
      <Dialog>
        <div className="flex justify-end end-auto relative right-[30px]">
          <DialogTrigger asChild>
            <Button className="hover:bg-blue-900 cursor-pointer flex gap-2 mt-7">
              add to my testimony Testify <AiIcons.AiOutlineEdit />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="scroll rounded-4xl">
          <DialogHeader>
            <DialogTitle
              className={`${moonDance.className} text-2xl font-bold`}
            >
              Share Your Thought
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p
              className={`text-gray-600 dark:text-gray-300 ${moonDance.className} text-xl`}
            >
              Tell us about your experience with our product or service.
            </p>
          </DialogDescription>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              {preview && (
                <Image
                  src={preview}
                  width={80}
                  height={80}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-blue-500 shadow-md"
                />
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Profile Image"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({ ...formData, avatar: e.target.files[0] });
                  }
                }}
                className="block w-40 text-sm text-gray-700 dark:text-gray-300
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-500 file:text-white
               hover:file:bg-blue-600
               cursor-pointer"
              />
            </div>

            <div className="mb-4 mt-5">
              <input
                type="text"
                id="name"
                placeholder=" FullName or Nickname"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white p-4"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="role"
                placeholder="Role or Department .."
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white p-4"
              />
            </div>
            <div className="mb-4">
              <textarea
                id="testimonial"
                rows={4}
                value={formData.testimonial}
                placeholder="Testimonial message ..."
                onChange={(e) =>
                  setFormData({ ...formData, testimonial: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white p-4"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Add Testimonial"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
