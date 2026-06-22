"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAbout } from "@/services/about";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Terminal } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import {
  SiPython,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiKalilinux,
  SiLua,
  SiJavascript,
  SiUbuntu,
  SiNextdotjs,
  SiArchlinux,
  SiHtml5,
  SiCss3,
  SiGit,
} from "react-icons/si";

const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"] });

interface About {
  id: number;
  heading: string;
  profile_image?: string;
  description: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout();
        setAbout(data);
      } catch (err) {
        console.error("Failed to load AboutPage", err);
      } finally {
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  const Skills = [
    { icon: <SiPython size={20} />, name: "Python", color: "text-yellow-500" },
    { icon: <SiUbuntu size={20} />, name: "Ubuntu", color: "text-orange-400" },
    { icon: <SiArchlinux size={20} />, name: "Archlinux", color: "text-blue-400" },
    { icon: <SiHtml5 size={20} />, name: "Html5", color: "text-orange-400" },
    { icon: <SiCss3 size={20} />, name: "Css3", color: "text-blue-400" },
    { icon: <SiGit size={20} />, name: "GIT", color: "text-orange-400" },
    { icon: <SiNextdotjs size={20} />, name: "Nextjs", color: "text-gray-400" },
    { icon: <SiTailwindcss size={20} />, name: "Tailwind CSS", color: "text-sky-400" },
    { icon: <SiDjango size={20} />, name: "Django", color: "text-green-500" },
    { icon: <SiPostgresql size={20} />, name: "PostgreSQL", color: "text-blue-300" },
    { icon: <SiDocker size={20} />, name: "Docker", color: "text-blue-400" },
    { icon: <SiKalilinux size={45} />, name: "Kalilinux", color: "text-gray-400" },
    { icon: <SiLua size={20} />, name: "Lua", color: "text-blue-400" },
    { icon: <SiJavascript size={20} />, name: "Javascripts", color: "text-yellow-400" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-16 bg-gray-950 text-green-400">
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
            <div className={`${mono.className} flex items-center gap-2 text-sm text-green-500/60 mb-2`}>
              <Terminal size={14} />
              <span>~/about $</span>
            </div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className={`${mono.className} text-4xl md:text-5xl font-bold text-green-400 mb-2`}>
              $ cat ./about.md
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className={`${mono.className} text-green-600/70 text-sm`}>
              # whoami — software developer &amp; problem solver
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Skeleton className="w-56 h-80 md:w-72 bg-gray-900 border border-green-500/10" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-gray-900" />
                <Skeleton className="h-20 w-full bg-gray-900" />
                <Skeleton className="h-12 w-full bg-gray-900" />
                <Skeleton className="h-12 w-full bg-gray-900" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="flex justify-center">
                {about?.profile_image ? (
                  <Image src={about.profile_image} alt={about.heading} width={400} height={400}
                    className="w-56 h-80 md:w-72 object-cover border border-green-500/30" />
                ) : (
                  <div className="w-56 h-80 md:w-72 border border-green-500/20 flex items-center justify-center">
                    <span className={`${mono.className} text-green-700/30`}>no image</span>
                  </div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="space-y-6">
                <h3 className={`${mono.className} text-2xl font-semibold text-green-300`}>
                  Hey there — I&apos;m David Francis, a software developer and problem solver.
                </h3>
                <p className={`${mono.className} text-green-600/80 leading-relaxed text-sm`}>
                  I&apos;ve honed my skills in frontend and backend development, working
                  with technologies like React, Next.js, TypeScript, Tailwind CSS,
                  Django, and Docker. I&apos;m constantly exploring new tools to stay
                  ahead in the fast-moving tech world.
                </p>

                <details className="bg-gray-900 border border-green-500/10 p-3">
                  <summary className={`${mono.className} cursor-pointer text-lg font-semibold text-green-400`}>## mission</summary>
                  <p className={`${mono.className} mt-2 text-green-600/70 text-sm`}>
                    To build meaningful, reliable, and impactful software that solves real-world problems — while continuously improving my craft and helping others grow.
                  </p>
                </details>

                <details className="bg-gray-900 border border-green-500/10 p-3">
                  <summary className={`${mono.className} cursor-pointer text-lg font-semibold text-green-400`}>## currently_working_on</summary>
                  <ul className={`${mono.className} mt-2 text-green-600/70 text-sm list-decimal list-inside space-y-1`}>
                    <li>Developing full-stack apps with Next.js & Django</li>
                    <li>Learning advanced software engineering concepts</li>
                    <li>Exploring DevOps, Docker, and cloud deployment</li>
                  </ul>
                </details>

                <div>
                  <h4 className={`${mono.className} text-xl font-semibold text-green-400 mb-4`}>## skills_tools</h4>
                  <div className="flex flex-wrap gap-4 sm:justify-between">
                    {Skills.map((skill, i) => (
                      <motion.span key={i} whileHover={{ scale: 1.1, rotate: 20 }}
                        className={`rounded-full text-sm font-medium flex items-center justify-center px-4 py-2 bg-gray-900 border border-green-500/20 ${skill.color}`} title={skill.name}>
                        {skill.icon} . {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
