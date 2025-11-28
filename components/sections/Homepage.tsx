"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import { fetchData } from "@/services/api";
import Image from "next/image";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

interface Home {
  id: number;
  title: string;
  subtitle: string;
  welcome_message: string;
}

export default function Home() {
  const [home, setHome] = useState<Home | null>(null);

  useEffect(() => {
    async function loadHome() {
      try {
        const data = await fetchData("/home/");
        setHome(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to load home:", err);
      }
    }
    loadHome();
  }, []);

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const techStack = [
    {
      icon: <SiReact size={36} />,
      name: "React",
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      icon: <SiNextdotjs size={36} />,
      name: "Next.js",
      color: "text-gray-900 dark:text-gray-200",
    },
    {
      icon: <SiTailwindcss size={36} />,
      name: "Tailwind CSS",
      color: "text-sky-500 dark:text-sky-400",
    },
    {
      icon: <SiDjango size={36} />,
      name: "Django",
      color: "text-green-700 dark:text-green-500",
    },
    {
      icon: <SiPostgresql size={36} />,
      name: "PostgreSQL",
      color: "text-blue-800 dark:text-blue-300",
    },
    {
      icon: <SiDocker size={36} />,
      name: "Docker",
      color: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <section
      id="home"
      className="h-screen flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-950 px-6 pt-20 md:pt-0 pb-5"
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
        className="flex-1 text-center md:text-left space-y-4"
      >
        {/* Greeting */}
        <motion.h3
          className="text-xl text-gray-700 dark:text-gray-300 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {getGreeting()} Dear
        </motion.h3>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white"
        >
          {home ? (
            <h1>{home.title}</h1>
          ) : (
            <div className="h-12 w-48 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
          )}
        </motion.div>

        {/* Typing Subtitle */}
        <motion.h2
          className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TypeAnimation
            sequence={[
              home?.subtitle ?? "Full-Stack Developer",
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
        </motion.h2>

        {/* Welcome message */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {home?.welcome_message ||
            "I build modern, responsive, and scalable web applications with clean code and powerful backends."}
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition-all hover:scale-105">
            <a href="#projects">View My Work</a>
          </Button>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2 }}
              className={`cursor-pointer ${tech.color}`}
              title={tech.name}
            >
              {tech.icon}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Content - Profile Picture */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="flex-1 flex justify-center"
      >
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500 dark:border-blue-400 transition-transform hover:scale-105 hover:rotate-2">
          <Image
            src="/ruk.png"
            alt="Francis David"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
