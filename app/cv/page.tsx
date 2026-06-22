"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Terminal, Download } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export default function CVPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/cv $</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}
            >
              $ cat ./resume.pdf
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}
            >
              # curriculum vitae
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end mb-4"
          >
            <a
              href="/cv/Davidfrancis_CV.png"
              download
              className={`${mono.className} inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-green-500/30 text-green-400 hover:bg-gray-800 transition-all text-sm`}
            >
              <Download size={14} />
              $ wget ./resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="border border-green-500/20 bg-gray-900/30 p-2 md:p-4"
          >
            <div className={`${mono.className} text-green-500/60 text-xs mb-3 px-1`}>
              $ cat ./resume.pdf | head -n 9999
            </div>
            <div className="relative w-full max-h-[80vh] overflow-y-auto flex justify-center">
              <Image
                src="/cv/Davidfrancis_CV.png"
                alt="CV"
                width={800}
                height={1100}
                className="object-contain border border-green-500/10"
                priority
              />
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
