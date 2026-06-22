"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getServices, Service } from "@/services/service";
import * as BsIcons from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/services $</span>
            </div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}>
              $ ls ./services/
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}>
              # what I can do for you
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-900/50 border border-green-500/10 p-6 flex flex-col items-center text-center space-y-4">
                  <Skeleton className="w-20 h-20 rounded-full bg-gray-900" />
                  <Skeleton className="h-6 w-2/3 bg-gray-900" />
                  <Skeleton className="h-4 w-4/5 bg-gray-900" />
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => {
                const IconComponent = (BsIcons as Record<string, React.ElementType>)[service.icon] || BsIcons.BsQuestionCircle;
                return (
                  <motion.div
                    key={service.id}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-gray-900/40 border border-green-500/20 hover:border-green-400/40 p-6 flex flex-col items-center text-center transition-all duration-300"
                  >
                    <div className="bg-green-900/30 border border-green-500/30 w-20 h-20 flex items-center justify-center mb-4">
                      <IconComponent className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className={`${mono.className} text-xl font-semibold mb-2 text-green-300`}>{service.title}</h3>
                    <p className={`${mono.className} text-green-600/70 text-sm`}>{service.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : !loading && (
            <p className={`${mono.className} text-center text-green-600/70 w-full`}>services: directory is empty</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
