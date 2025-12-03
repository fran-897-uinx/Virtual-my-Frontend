"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import { getAbout } from "@/services/about";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { Skeleton } from "../ui/skeleton";

interface About {
  id: number;
  heading: string;
  profile_image?: string;
  description: string;
}

export default function About() {
  const [about, setAbout] = useState<About | null>(null);

  // Helper to build absolute URLs for images
  const getImageUrl = (path?: string) => {
    if (!path) return "/images/u.jpg";
    if (path.startsWith("http")) return path;
    return `http://127.0.0.1:8050${path.startsWith("/") ? "" : "/"}${path}`;
  };

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (err) {
        console.error("Failed to load AboutPage", err);
      }
    }
    loadAbout();
  }, []);

  return (
    <section
      id="about"
      className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
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
          <div className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <Typewriter
              options={{
                strings: [
                  "I build modern, responsive web applications.",
                  "I love turning ideas into code.",
                  " IDE is my playground.",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </div>
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
                src={about.profile_image}
                alt={about.heading}
                width={400}
                height={400}
                className="rounded-2xl w-56 h-80 md:w-72 shadow-2xl object-cover border-2 border-blue-500 dark:border-blue-400"
              />
            ) : (
              <Skeleton className="w-full h-40 md:h-48 rounded-xl" />
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
              Hey there 👋 — I’m David Francis, a software developer and problem
              solver.
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I’ve honed my skills in frontend and backend development, working
              with technologies like React, Next.js, TypeScript, Tailwind CSS,
              Django, and Docker. I’m constantly exploring new tools to stay
              ahead in the fast-moving tech world.
            </p>

            {/* Collapsible Mission Section */}
            <details className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-white">
                My Mission
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                To build meaningful, reliable, and impactful software that
                solves real-world problems — while continuously improving my
                craft and helping others grow.
              </p>
            </details>

            {/* Collapsible Current Work */}
            <details className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-white">
                What I am currently working on
              </summary>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 list-decimal list-inside space-y-1">
                <li>Developing full-stack apps with Next.js & Django</li>
                <li>Learning advanced software engineering concepts</li>
                <li>Exploring DevOps, Docker, and cloud deployment</li>
              </ul>
            </details>

            {/* Skills Section with motion */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Skills & Tools
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "HTML",
                  "CSS",
                  "Tailwind",
                  "Next.js",
                  "TypeScript",
                  "Django",
                  "Docker",
                  "Bash",
                  "Python",
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
      </main>
    </section>
  );
}
