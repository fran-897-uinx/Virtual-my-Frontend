"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCertificates } from "@/services/cert";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, Award, Calendar } from "lucide-react";

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
      <main className="min-h-screen pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Certificates
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Professional certifications and achievements
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
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 backdrop-blur-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
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
                  className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  {cert.certificate_image ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={cert.certificate_image}
                        alt={cert.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 flex items-center justify-center">
                      <Award size={48} className="text-gray-400" />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {cert.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {cert.issuer}
                    </p>
                    {cert.issue_date && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(cert.issue_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {search ? "No certificates match your search." : "No certificates available yet."}
              </p>
            </div>
          )}
        </section>
      </main>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ${selectedCert ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSelectedCert(null)}
      >
        {selectedCert && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-[95vw] max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedCert.certificate_image ? (
              <div className="relative w-full h-[60vh] md:h-[75vh]">
                <Image
                  src={selectedCert.certificate_image}
                  alt={selectedCert.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="text-center text-white py-20">
                <Award size={64} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-bold">{selectedCert.name}</h2>
                <p className="text-gray-400">{selectedCert.issuer}</p>
              </div>
            )}
            <div className="text-center mt-4">
              <h2 className="text-white text-xl font-bold">{selectedCert.name}</h2>
              <p className="text-gray-400">{selectedCert.issuer} · {selectedCert.issue_date?.split("-")[0]}</p>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  );
}
