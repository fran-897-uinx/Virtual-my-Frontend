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
                src="images/u.jpg"
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
             Hey there 👋 — I’m David Francis, a passionate software developer and problem solver dedicated to
              building clean, 
              efficient, and scalable web applications
            </h3>
            {/* <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I love turning ideas into reality through code — from crafting smooth,
              interactive user interfaces to designing reliable backend systems that 
              power real-world products. My main focus is creating modern, high-performing 
              digital experiences that work beautifully on any device.
            </p> */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I’ve honed my skills in both frontend and backend development. 
              I enjoy working with technologies like React, Next.js, TypeScript, 
              Tailwind CSS, Django, and Docker, and I’m always exploring new tools
              to stay ahead in the fast-moving tech world.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Beyond coding, I’m passionate about learning, teaching, and open-source
              collaboration. I enjoy sharing my knowledge, contributing to projects,
              and constantly challenging myself to grow into a better engineer every day.
            </p>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4"> My Mission </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To build meaningful, reliable, and impactful software that solves real-world problems
                — while continuously improving my craft and helping others grow along the way.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What i am currently working on </h4>
                <ul className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  <li> 1) Developing full-stack applications using Next.js and Django</li>
                  <li> 2) Learning advanced software engineering and system design concepts</li>
                  <li> 3) Exploring DevOps, Docker, and cloud deployment to automate and scale projects</li>
                </ul>
            </div>
            {/* Skills section */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Skills & Tools
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Html",
                  "Css",
                  "Tailwind",
                  "Next.js",
                  "TypeScript",
                  "TailwindCSS",
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
      </div>
    </section>
  );
}
