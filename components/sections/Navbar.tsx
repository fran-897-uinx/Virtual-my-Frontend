"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Fix hydration error
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Scroll spy
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "blog",
        "services",
        "projects",
        "contact",
        "testi",
        "cert",
      ];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "blog", label: "Blog" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "testi", label: "Testimonials" },
    { id: "cert", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        fixed top-3 left-1/2 -translate-x-1/2 z-50 
        max-w-6xl w-[95%]
        px-4 py-2 rounded-full
        backdrop-blur-xl
        bg-white/10 dark:bg-gray-900/20
        border border-white/20 dark:border-gray-700/30
        shadow-lg shadow-black/10 mb-7
      "
    >
      <div className="flex justify-between items-center h-14">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/file.png"
              alt="David Francis"
              width={40}
              height={40}
              className="rounded-full object-cover shadow-md border-2 border-blue-500 dark:border-blue-400"
            />
            <span className="hidden md:inline text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              David Francis
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="relative font-medium transition-colors"
            >
              <span
                className={`${
                  activeSection === item.id
                    ? "text-blue-400 drop-shadow-md"
                    : "text-gray-900 dark:text-gray-300 hover:text-blue-300"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-400 transition-all ${
                  activeSection === item.id ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/40 transition"
              whileTap={{ rotate: 20 }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-800 dark:text-gray-200"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="
            mt-3 md:hidden
            backdrop-blur-xl
            bg-white/10 dark:bg-gray-900/30
            border border-white/20 dark:border-gray-700/30
            rounded-2xl p-4 shadow-lg
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-lg transition ${
                activeSection === item.id
                  ? "text-blue-400 font-semibold"
                  : "text-gray-800 dark:text-gray-300 hover:text-blue-300"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="
                mt-4 w-full p-2 rounded-xl
                backdrop-blur-md bg-white/10 dark:bg-gray-700/30
                hover:bg-white/20 dark:hover:bg-gray-700/40 transition
              "
              whileTap={{ rotate: 20 }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
