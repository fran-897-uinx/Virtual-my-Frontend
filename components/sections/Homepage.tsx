"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { fetchData } from "@/services/api";
import Image from "next/image";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });
import {
  SiPython,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiLinux,
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
      icon: <SiPython size={36} />,
      name: "Python",
      color: "text-yellow-500 dark:text-yellow-400",
    },
    {
      icon: <SiLinux size={36} />,
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
      className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 bg-gray-950 px-6 pt-20 md:pt-0 pb-5"
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
        className="flex-1 text-center md:text-left space-y-4"
      >
        {/* Terminal header */}
        <motion.div
          className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Terminal size={14} />
          <span>~/home $</span>
        </motion.div>

        {/* Greeting */}
        <motion.h3
          className={`${mono.className} text-lg text-green-600/70 font-medium`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          # {getGreeting()} Dear
        </motion.h3>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {home ? (
            <h1 className={`${mono.className} text-3xl md:text-5xl font-bold text-green-400 mb-2`}>
              {home.title}
            </h1>
          ) : (
            <div className="h-12 w-48 bg-gray-900 border border-green-500/20 animate-pulse" />
          )}
          <h1 className={`${mono.className} text-xl text-green-500/80 mb-4`}>
            Backend Developer & system Engineer
          </h1>
        </motion.div>

        {/* Typing Subtitle */}
        <motion.h2
          className={`${mono.className} text-xl text-green-600/70 mb-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TypeAnimation
            sequence={[
              home?.subtitle ?? "A Software Developer",
              1000,
              "A Python expertise",
              1500,
            ]}
            wrapper="span"
            speed={20}
            repeat={Infinity}
          />
        </motion.h2>

        {/* Welcome message */}
        <motion.p
          className={`${mono.className} text-sm text-green-600/60 max-w-xl mb-6 leading-relaxed`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          # {home?.welcome_message ||
            "i Am a passionate backend developer and system engineer with a knack for crafting efficient and scalable solutions. With expertise in Python, Django, and cloud technologies, I thrive on building robust applications that solve real-world problems. Let's connect and create something amazing together!"}
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3"
        >
          <a
            href="/projects"
            className={`${mono.className} inline-block px-6 py-3 bg-green-900/30 border border-green-500/50 text-green-400 hover:bg-green-900/50 transition text-sm`}
          >
            $ cd ./projects
          </a>
          <a
            href="/contact"
            className={`${mono.className} inline-block px-6 py-3 bg-gray-900 border border-green-500/30 text-green-500 hover:bg-gray-800 transition text-sm`}
          >
            $ mail --contact
          </a>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, rotate: 30 }}
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
        <div className="relative w-56 h-56 md:w-72 md:h-72 overflow-hidden border-2 border-green-500/30 transition-transform hover:scale-105 hover:border-green-400/60">
          <Image
            src="/ruk.png"
            alt="Francis David"
            className="object-cover"
            priority
            fill
          />
        </div>
      </motion.div>
    </section>
  );
}
