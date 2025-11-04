"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { fetchData } from "@/services/api";
import * as AiIcons from "react-icons/ai";
import Image from "next/image";

// shadcn carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  avatar?: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    fetchData("/testimonials/")
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="testimonials" className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">What People Say</h2>

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
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center h-full hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4 overflow-hidden">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AiIcons.AiOutlineUser className="w-10 h-10 text-blue-600 dark:text-blue-300" />
                  )}
                </div>

                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {t.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.testimonial}
                </p>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  className="hidden md:block" />
        <CarouselNext  className="hidden md:block" />
      </Carousel>
    </section>
  );
}
