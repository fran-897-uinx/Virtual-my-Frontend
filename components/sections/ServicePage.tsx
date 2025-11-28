"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import * as BsIcons from "react-icons/bs";
import { getServices, Service } from "@/services/service";

// shadcn carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ added skeleton
import Autoplay from "embla-carousel-autoplay";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true); // ✅ track loading
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    getServices()
      .then((data) => setServices(data))
      .catch(console.error)
      .finally(() => setLoading(false)); // ✅ stop skeleton once done
  }, []);

  // ✅ skeleton placeholders
  const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
    <CarouselItem
      key={`skeleton-${index}`}
      className="basis-full sm:basis-1/2 md:basis-1/3"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center h-full space-y-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </CarouselItem>
  ));

  return (
    <section id="services" className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>

      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true }}
        className="w-full gap-3.5"
      >
        <CarouselContent>
          {loading
            ? skeletonItems
            : services.map((service) => {
                const IconComponent =
                  (BsIcons as Record<string, React.ElementType>)[
                    service.icon
                  ] || BsIcons.BsQuestionCircle;

                return (
                  <CarouselItem
                    key={service.id}
                    className="basis-full sm:basis-1/2 md:basis-1/3"
                  >
                    <motion.div
                      className="bg-white  dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 h-full cursor-pointer "
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-blue-100 dark:bg-blue-900 w-20 h-20 flex items-center justify-center rounded-full mb-4">
                        <IconComponent className="w-10 h-10 text-blue-600 dark:text-blue-300" />
                      </div>

                      <h3 className="text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {service.description}
                      </p>
                    </motion.div>
                  </CarouselItem>
                );
              })}
        </CarouselContent>
        <CarouselPrevious  className="hidden md:block" />
        <CarouselNext  className="hidden md:block" />
      </Carousel>
    </section>
  );
}
