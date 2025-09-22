"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"
import { fetchData } from "@/services/api";
import Image from "next/image"
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiDocker,
} from "react-icons/si"

interface Home {
  id: number;
  title: string;
  subtitle: string;
  welcome_message: string;
}

const images = [{ id: 1, title: "Francis David", src: "/images/u.jpg" }];

export default function Home() {
  const [home, setHome] = useState<Home | null>(null);

  useEffect(() => {
    async function loadHome() {
      try {
        const data = await fetchData("/home/"); // Django API endpoint
        // if your API returns a list, pick the first item
        setHome(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to load home:", err);
      }
    }
    loadHome();
  }, []);

  return (
    <section
      id="home"
      className="h-screen flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-950 px-6 pt-20 md:pt-0 pb-5"
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left"
      >
        <h1 className="text-5xl font-extrabold mb-4">
          {home ? home.title : "Loading..."}
        </h1>

        {/* Typing Effect */}
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          <TypeAnimation
            sequence={[
              home?.subtitle || "Full-Stack Developer",
              1000,
              "Django + Next.js Engineer",
              1000,
              "API Designer",
              1000,
              "I'M The CodeSmith Dev",
              6000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h2>

        {/* Slug line */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-xl">
          {home?.welcome_message ||
            "I build modern, responsive, and scalable web applications with clean code and powerful backends."}
        </p>

        {/* Call to Action */}
        <Button asChild>
          <a href="#projects" className="px-6 py-3">
            View My Work
          </a>
        </Button>

        {/* Tech Stack Logos */}
        <div className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start">
          <SiReact size={36} className="text-blue-500 dark:text-blue-400" />
          <SiNextdotjs size={36} className="text-gray-900 dark:text-gray-200" />
          <SiTailwindcss size={36} className="text-sky-500" />
          <SiDjango size={36} className="text-green-700 dark:text-green-500" />
          <SiPostgresql
            size={36}
            className="text-blue-800 dark:text-blue-300"
          />
          <SiDocker size={36} className="text-blue-600 dark:text-blue-400" />
        </div>
      </motion.div>

      {/* Right Content - Profile Picture */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center"
      >
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg border-4 border-blue-500 dark:border-blue-400">
          {/* Profile Image */}
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.src}
              alt={image.title}
              fill
              className="object-cover"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
