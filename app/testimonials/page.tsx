"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import TestimonialsSection from "@/components/sections/Testimonail";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/testimonials $</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}
            >
              $ cat ./reviews/*
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}
            >
              # what people say about working with me
            </motion.p>
          </motion.div>
        </section>
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
