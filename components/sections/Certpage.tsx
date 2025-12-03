"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCertificates } from "@/services/cert";
import { Skeleton } from "@/components/ui/skeleton";

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

  function getImageUrl(url: string | null) {
    return url || "/cert.jpg";
  }
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

  const skeletonCount = 6; // how many skeleton cards to show

  return (
    <section id="cert" className="py-20 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl font-bold text-center mb-12">Certificates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/20 shadow-xl rounded-3xl p-6"
              >
                <Skeleton className="w-full h-48 rounded-xl mb-5" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4 mb-1" />
                <Skeleton className="w-1/3 h-4" />
              </motion.div>
            ))
          : certificates.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/20 shadow-xl rounded-3xl p-6 hover:scale-[1.03] transition-transform cursor-pointer"
              >
                {/* Certificate Image */}
                <div className="w-full h-48 relative rounded-xl overflow-hidden mb-5 md:hover:scale-150  transition-transform duration-300 hover:scale-110 z-20 md:cursor-pointer md:shadow-lg md:shadow-black/20">
                  {cert.certificate_image ? (
                    <Image
                      src={cert.certificate_image}
                      alt={cert.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center ">
                      No Image
                    </div>
                  )}
                </div>

                {/* Certificate Details */}
                <h3 className="text-xl font-semibold mb-1">{cert.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  Issuer: {cert.issuer}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Year: {cert.issue_date.split("-")[0]}
                </p>
              </motion.div>
            ))}
      </div>
    </section>
  );
}
