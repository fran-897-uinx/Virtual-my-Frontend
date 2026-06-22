"use client";
import Home from "@/components/sections/Homepage";
import About from "@/components/sections/AboutPage";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { SiGithub, SiYoutube } from "react-icons/si";
import { LucideNotebookText } from "lucide-react";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
export default function Landing() {
  const Dots = [
    {
      icon: <SiGithub size={20} />,
      name: "Github",
      color: "text-gray-500 dark:text-gray-300",
      link: "https://github.com/DeFrancis-unix27",
    },
    {
      icon: <LucideNotebookText size={20} />,
      name: "CV",
      color: "text-gray-800 dark:text-white",
      link: "/cv", // <= triggers CV download
    },
    {
      icon: <BsLinkedin size={20} />,
      name: "Linkedin",
      color: "text-blue-400 dark:text-blue-600",
      link: "https://www.linkedin.com/in/francis-david-7code",
    },
    {
      icon: <SiYoutube size={20} />,
      name: "Youtube",
      color: "text-red-800 dark:text-red-500",
      link: "https://youtube.com/codesmith_dev",
    },
    {
      icon: <BsTwitterX size={20} />,
      name: "X",
      color: "text-gray-900 dark:text-gray-300",
      link: "https://x.com/CodeWithFrancis",
    },
  ];

  const Blog = dynamic(() => import("@/components/sections/BlogPage"), {
    ssr: false,
  });
  const Services = dynamic(() => import("@/components/sections/ServicePage"), {
    ssr: false,
  });
  const Projects = dynamic(() => import("@/components/sections/ProjectPage"), {
    ssr: false,
  });
  const Testimonials = dynamic(
    () => import("@/components/sections/Testimonail"),
    { ssr: false },
  );
  const Gallery = dynamic(
    () => import("@/components/sections/GalleryPage"),
    { ssr: false },
  );
  const CertificateSection = dynamic(
    () => import("@/components/sections/Certpage"),
    { ssr: false },
  );
  const Contact = dynamic(() => import("@/components/sections/ContactPage"), {
    ssr: false,
  });

  return (
    <main className="bg-gray-950">
      <Navbar />
      <Home />
      <About />
      <Blog />
      <Services />
      <Projects />
      <Gallery />
      <Testimonials />
      <CertificateSection />
      <Contact />
      <Footer />

      {/* SOCIAL / ACTION ICONS */}
      <motion.div
        className="gap-6 mt-8 justify-center md:justify-start fixed top-44 md:right-12 right-2 grid grid-cols-1 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20
          border border-white/20 dark:border-gray-700/30
          shadow-lg shadow-black/55  p-2.5 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {Dots.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            className={`cursor-pointer ${tech.color}`}
            title={tech.name}
          >
            {tech.link ? (
              <Link href={tech.link} target="_blank">
                {tech.icon}
              </Link>
            ) : (
              tech.icon
            )}
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
