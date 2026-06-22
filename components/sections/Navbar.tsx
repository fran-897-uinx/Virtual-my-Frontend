"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const moreLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Certificates", href: "/certificates" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-6xl w-[95%] px-4 py-2 rounded-full backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 shadow-lg shadow-black/10 mb-7"
    >
      <div className="flex justify-between items-center h-14">
        <Link href="/" className="flex items-center gap-2">
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
            <span className="hidden md:inline text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              David Francis
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-all text-gray-900 dark:text-gray-300 hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}

          {moreLinks.length > 0 && (
            <div className="relative group">
              <span className="text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300 hover:text-blue-300 transition-all">
                More ▾
              </span>
              <div className="absolute right-0 mt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                {moreLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/40 transition duration-700"
              whileTap={{ rotate: 20 }}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-blue-800 dark:text-gray-200"
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
          className="mt-3 lg:hidden backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/30 rounded-2xl p-4 shadow-lg"
        >
          {[...navLinks, ...moreLinks].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-lg transition text-gray-800 dark:text-gray-300 hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}

          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-4 w-full p-2 rounded-xl backdrop-blur-md bg-white/10 dark:bg-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-700/40 transition"
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
