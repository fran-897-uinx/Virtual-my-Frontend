"use client";
import { useEffect, useState } from "react";

import Home from "@/components/sections/Homepage";
import About from "@/components/sections/AboutPage";
import Blog from "@/components/sections/BlogPage";
import Projects from "@/components/sections/ProjectPage";
import Contact from "@/components/sections/ContactPage";
import Navbar from "@/components/sections/Navbar";
import Services from "@/components/sections/ServicePage";
import Testimonials from "@/components/sections/Testimonail";
import Footer from "@/components/sections/Footer";
import CertificateSection from "@/components/sections/Certpage";

import { SiDailydotdev, SiGithub, SiReddit, SiX } from "react-icons/si";

import { LucideNotebookText } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";
import { link } from "fs";

export default function Landing() {
  // --------------------------
  // CV DOWNLOAD FUNCTION
  // --------------------------
  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/francisdavid_cv.pdf"; // <= Place file in public/cv/
    link.download = "francisdavid_cv.pdf";
    link.click();
  };

  const Dots = [
    {
      icon: <SiGithub size={20} />,
      name: "Github",
      color: "text-gray-500 dark:text-gray-300",
      link: "https://github.com/fran-897-uinx",
    },
    {
      icon: <LucideNotebookText size={20} />,
      name: "CV",
      color: "text-gray-800 dark:text-gray-100",
      link: "/cv/Davidfrancis_CV.png", // <= triggers CV download
    },
    {
      icon: <BsLinkedin size={20} />,
      name: "Linkedin",
      color: "text-blue-400 dark:text-blue-600",
      link: "https://www.linkedin.com/in/francis-prevail-39b800359/",
    },
    {
      icon: <SiDailydotdev size={20} />,
      name: "Daily.dev",
      color: "text-gray-800 dark:text-gray-100",
      link: "https://app.daily.dev/combat",
    },
    {
      icon: <SiReddit size={20} />,
      name: "X",
      color: "text-red-900 dark:text-red-600",
      link: "https://www.reddit.com/user/ErrorSenior6225/",
    },
  ];

  return (
    <main>
      <Navbar />
      <Home />
      <About />
      <Blog />
      <Services />
      <Projects />
      <Testimonials />
      <CertificateSection />
      <Contact />
      <Footer />

      {/* SOCIAL / ACTION ICONS */}
      <motion.div
        className="gap-6 mt-8 justify-center md:justify-start fixed top-44 md:right-12 right-2 grid grid-cols-1 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20
          border border-white/20 dark:border-gray-700/30
          shadow-lg shadow-black/10 p-2.5 rounded-b-full"
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
