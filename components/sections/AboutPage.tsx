"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import Image from "next/image";

interface About {
  id: number;
  heading: string;
  profile_image?: string;
  description: string;
}

export default function About() {
  const [about, setAbout] = useState<About | null>(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await fetchData("/about/"); // Django API endpoint
        // if your API returns a list, pick the first item
        setAbout(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to load the AboutPage", err);
      }
    }
    loadAbout();
  }, []);

  return (
    <section
      id="about"
      className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I’m a passionate developer focused on building modern, responsive,
            and scalable web applications.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex justify-center"
          >
            {about?.profile_image ? (
              <Image
                src={about.profile_image} // prepend backend URL
                alt={about.heading}
                width={400}
                height={400}
                className="rounded-2xl w-56 h-80 md:w-72 shadow-2xl object-cover border-2 border-blue-500 dark:border-blue-400"
              />
            ) : (
              <Image
                src="/u.jpg"
                alt="Default"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl object-cover border-2 border-blue-500 dark:border-blue-400"
              />
            )}
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Who I Am
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I have experience in full-stack development, working with modern
              frameworks like Next.js, React, and Django. My focus is on
              delivering clean code, intuitive UI, and optimized performance.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Outside of coding, I love exploring new technologies, contributing
              to open source, and sharing knowledge with the tech community.
            </p>

            {/* Skills section */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Skills & Tools
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "TailwindCSS",
                  "Django",
                  "Docker",
                ].map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
