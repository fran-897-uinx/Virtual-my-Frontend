"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";

const pageLinks = [
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "cert", label: "Certificates", href: "/certificates" },
];

const sectionLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "testi", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);

  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const ids = ["home", "about", "services", "testi", "contact"];
      let current = "home";
      for (const id of ids) {
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
  }, [isHome]);

  const navItems = isHome
    ? [...sectionLinks, ...pageLinks]
    : [...pageLinks, ...sectionLinks];

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
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => {
            const href = "href" in item ? (item as typeof pageLinks[0]).href : `#${item.id}`;
            const isHash = href.startsWith("#");
            const isActive = isHome && isHash && activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={href}
                className="relative font-medium transition-all duration-1000 ease-linear"
              >
                <span
                  className={`${
                    isActive
                      ? "text-blue-400 drop-shadow-md"
                      : "text-gray-900 dark:text-gray-300 hover:text-blue-300 transition-all duration-1000 ease-linear"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-400 transition-all duration-1000 ease-linear${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}

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
          {navItems.map((item) => {
            const href = "href" in item ? (item as typeof pageLinks[0]).href : `#${item.id}`;
            const isHash = href.startsWith("#");
            const isActive = isHome && isHash && activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-lg transition ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

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
