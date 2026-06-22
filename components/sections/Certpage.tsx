"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCertificates } from "@/services/cert";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  certificate_image?: string;
}

export default function CertificateSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
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

  const skeletonCount = 6;

  return (
    <section id="cert" className="bg-gray-950 py-16 px-6 md:px-12 lg:px-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
          <Terminal size={14} />
          <span>~/certificates $</span>
        </div>
        <h2 className={`${mono.className} text-3xl md:text-5xl font-bold text-green-400`}>
          $ ls ./credentials/
        </h2>
        <p className={`${mono.className} text-green-600/60 text-sm mt-1`}>
          # professional certifications and achievements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <div key={idx} className="bg-gray-900/40 border border-green-500/10 p-5">
                <Skeleton className="w-full h-48 mb-4 bg-gray-900" />
                <Skeleton className="w-3/4 h-5 mb-2 bg-gray-900" />
                <Skeleton className="w-1/2 h-4 bg-gray-900" />
              </div>
            ))
          : certificates.length > 0
            ? certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-gray-900/40 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="w-full h-48 relative overflow-hidden border-b border-green-500/10">
                    {cert.certificate_image ? (
                      <Image
                        src={cert.certificate_image}
                        alt={cert.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="bg-gray-900 w-full h-full flex items-center justify-center">
                        <span className={`${mono.className} text-green-700/30 text-2xl`}>~</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className={`${mono.className} text-green-600/50 text-xs mb-1`}>$ cat ./credentials/{cert.id}</div>
                    <h3 className={`${mono.className} text-green-300 font-semibold text-base mb-1 line-clamp-1`}>{cert.name}</h3>
                    <p className={`${mono.className} text-green-600/70 text-xs`}>{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className={`${mono.className} text-green-700/50 text-[10px] mt-1`}>issued: {cert.issue_date.split("-")[0]}</p>
                    )}
                  </div>
                </motion.div>
              ))
            : !loading && (
                <div className="col-span-full text-center py-12">
                  <p className={`${mono.className} text-green-600/70`}>certificates: directory is empty</p>
                </div>
              )}
      </div>

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
              <p className={`${mono.className} text-green-600/70 text-sm`}>{selectedCert.issuer} {selectedCert.issue_date && `| ${selectedCert.issue_date.split("-")[0]}`}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
