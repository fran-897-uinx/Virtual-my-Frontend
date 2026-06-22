"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getGalleryImages, GalleryItem } from "@/services/gallery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Terminal, ChevronDown } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

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

  return (
    <section id="gallery" className="bg-gray-950 py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/gallery $</span>
            </div>
            <h2 className={`${mono.className} text-3xl md:text-5xl font-bold text-green-400`}>
              $ ls ./events/
            </h2>
            <p className={`${mono.className} text-green-600/60 text-sm mt-1`}>
              # moments captured from events, meetups, and experiences
            </p>
          </motion.div>
          <Link
            href="/gallery"
            className={`${mono.className} text-sm text-green-500/80 hover:text-green-400 underline underline-offset-4`}
          >
            $ ls ./all/
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px]"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className={`relative ${sizeMapMd[idx % sizeMapMd.length]}`}>
                  <div className="w-full h-full bg-gray-900 border border-green-500/10 animate-pulse flex items-center justify-center">
                    <span className={`${mono.className} text-green-700/30 text-xs`}>loading...</span>
                  </div>
                </div>
              ))
            : images.length > 0
              ? images.map((item, idx) => {
                  const shapeIdx = idx % clipShapes.length;
                  return (
                    <motion.div
                      key={item.id}
                      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                      className={`relative group cursor-pointer border border-green-500/20 hover:border-green-400/50 transition-colors ${sizeMapMd[idx % sizeMapMd.length]}`}
                      whileHover={{ scale: 1.02, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      onClick={() => setSelectedImage(item)}
                    >
                      <div
                        className="relative w-full h-full overflow-hidden bg-gray-900"
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
                        className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ clipPath: clipShapes[shapeIdx] }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className={`${mono.className} text-green-400 text-xs opacity-70 mb-0.5`}>$ cat ./events/</p>
                          <h3 className={`${mono.className} text-green-300 font-bold text-sm md:text-base`}>{item.title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              : !loading && (
                  <div className="col-span-full text-center py-20">
                    <p className={`${mono.className} text-green-600/70`}>gallery: directory is empty</p>
                    <p className={`${mono.className} text-green-700/50 text-xs mt-2`}>awaiting uploads...</p>
                  </div>
                )}
        </motion.div>

        {!loading && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`${mono.className} flex items-center gap-2 mt-8 text-xs text-green-600/60`}
          >
            <ChevronDown size={14} />
            <span>{images.length} entries</span>
          </motion.div>
        )}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-2 md:p-4 bg-gray-950 border border-green-500/30 rounded-none">
          {selectedImage && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedImage.title}</DialogTitle>
              </DialogHeader>
              <div className={`${mono.className} text-green-500/60 text-xs mb-2 px-2`}>
                $ cat ./events/{selectedImage.id}
              </div>
              <div className="relative w-full h-[50vh] md:h-[70vh] border border-green-500/20">
                <Image src={selectedImage.image} alt={selectedImage.title} fill className="object-contain p-1" />
              </div>
              <div className="text-center pb-2 px-2 mt-3">
                <h3 className={`${mono.className} text-green-400 font-bold text-lg`}>{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className={`${mono.className} text-green-600/70 text-sm mt-1`}>{selectedImage.description}</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
