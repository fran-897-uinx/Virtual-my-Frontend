"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getGalleryImages, GalleryItem } from "@/services/gallery";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const clipShapes = [
  "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
  "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
  "polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)",
  "polygon(5% 0%, 100% 0%, 100% 100%, 5% 100%, 0% 50%)",
  "polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%)",
  "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
  "polygon(0% 0%, 100% 0%, 100% 85%, 90% 100%, 0% 100%)",
  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 5% 50%)",
];

const sizeMapMd = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section id="gallery" className="py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-6"
      >
        Event Gallery
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-xl mx-auto"
      >
        Moments captured from events, meetups, and experiences
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-7xl mx-auto auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px]"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`relative ${sizeMapMd[idx % sizeMapMd.length]}`}
              >
                <Skeleton className="w-full h-full rounded-2xl" />
              </motion.div>
            ))
          : images.length > 0
            ? images.map((item, idx) => {
                const shapeIdx = idx % clipShapes.length;

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className={`relative group cursor-pointer ${sizeMapMd[idx % sizeMapMd.length]}`}
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div
                      className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-800"
                      style={{ clipPath: clipShapes[shapeIdx] }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ clipPath: clipShapes[shapeIdx] }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-sm md:text-base leading-tight">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-gray-200 text-xs mt-1 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            : !loading && (
                <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-20">
                  Gallery will be available soon...
                </p>
              )}
      </motion.div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-2 md:p-4 bg-black/95 border-gray-700">
          {selectedImage && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedImage.title}</DialogTitle>
              </DialogHeader>
              <div className="relative w-full h-[50vh] md:h-[70vh]">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center pb-2 px-2">
                <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-400 text-sm mt-1">{selectedImage.description}</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
