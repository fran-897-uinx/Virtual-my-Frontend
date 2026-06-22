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
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, ChevronDown } from "lucide-react";

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
  const [search, setSearch] = useState("");

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

  const filtered = images.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Event Gallery
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Browse through moments captured from events, meetups, and experiences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto mb-12"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search gallery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 backdrop-blur-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-7xl mx-auto auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px]">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className={`relative ${sizeMapMd[idx % sizeMapMd.length]}`}>
                  <Skeleton className="w-full h-full rounded-2xl" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-7xl mx-auto auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px]"
            >
              {filtered.map((item, idx) => {
                const shapeIdx = idx % clipShapes.length;
                return (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.9 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
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
                        <h3 className="text-white font-semibold text-sm md:text-base">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {search ? "No results found for your search." : "Gallery will be available soon..."}
              </p>
            </div>
          )}

          {!loading && images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 mt-12 text-sm text-gray-500 dark:text-gray-400"
            >
              <ChevronDown size={16} />
              <span>{filtered.length} of {images.length} photos</span>
            </motion.div>
          )}
        </section>
      </main>

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

      <Footer />
    </>
  );
}
