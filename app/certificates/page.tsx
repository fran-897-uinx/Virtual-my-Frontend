"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCertificates } from "@/services/cert";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  certificate_image?: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function fetchCerts() {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error("Failed to load certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCerts();
  }, []);

  const filtered = certificates.filter((cert) =>
    cert.name.toLowerCase().includes(search.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/certificates $</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}
            >
              $ ls ./credentials/
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}
            >
              # professional certifications and achievements
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mb-12"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600/50" size={18} />
            <input
              type="text"
              placeholder="grep -i 'search' ./credentials/*"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${mono.className} w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-green-500/30 text-green-400 placeholder-green-700/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/30`}
            />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="border border-green-500/10 bg-gray-900/50">
                  <Skeleton className="h-48 w-full rounded-none bg-gray-900" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-900" />
                    <Skeleton className="h-4 w-1/2 bg-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((cert, index) => (
                <motion.div
                  key={cert.id || index}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="group border border-green-500/20 hover:border-green-400/50 bg-gray-900/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  {cert.certificate_image ? (
                    <div className="relative h-48 w-full overflow-hidden border-b border-green-500/10">
                      <Image src={cert.certificate_image} alt={cert.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-900 border-b border-green-500/10 flex items-center justify-center">
                      <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`${mono.className} text-green-600/50 text-xs mb-1`}>$ cat ./credentials/{cert.id}</div>
                    <h2 className={`${mono.className} text-green-300 font-semibold text-base mb-1 line-clamp-1 group-hover:text-green-200 transition-colors`}>
                      {cert.name}
                    </h2>
                    <p className={`${mono.className} text-green-600/80 text-xs`}>{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className={`${mono.className} text-green-700/50 text-[10px] mt-1`}>issued: {new Date(cert.issue_date).getFullYear()}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className={`${mono.className} text-green-600/70`}>
                {search ? "No results." : "certificates: directory is empty"}
              </p>
            </div>
          )}
        </section>
      </main>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 transition-opacity duration-300 ${selectedCert ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSelectedCert(null)}
      >
        {selectedCert && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-[95vw] max-h-[90vh] p-4 border border-green-500/30 bg-gray-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${mono.className} text-green-500/60 text-xs mb-3 px-1`}>
              $ cat ./credentials/{selectedCert.id}
            </div>
            {selectedCert.certificate_image ? (
              <div className="relative w-full h-[55vh] md:h-[70vh] border border-green-500/20">
                <Image src={selectedCert.certificate_image} alt={selectedCert.name} fill className="object-contain p-1" />
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className={`${mono.className} text-green-400 text-2xl font-bold`}>{selectedCert.name}</h2>
                <p className={`${mono.className} text-green-600/70 mt-2`}>{selectedCert.issuer}</p>
              </div>
            )}
            <div className="text-center mt-4 border-t border-green-500/10 pt-3">
              <h2 className={`${mono.className} text-green-400 font-bold text-xl`}>{selectedCert.name}</h2>
              <p className={`${mono.className} text-green-600/70 text-sm`}>{selectedCert.issuer} {selectedCert.issue_date && `| ${new Date(selectedCert.issue_date).getFullYear()}`}</p>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  );
}
