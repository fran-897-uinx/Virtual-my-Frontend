"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Name */}
        <Link href="#home" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Francis <span className="text-gray-600 dark:text-gray-200">David</span>
        </Link>

        {/* Links */}
        <nav className="flex gap-6">
          <Link href="#home" className="hover:text-blue-500">Home</Link>
          <Link href="#about" className="hover:text-blue-500">About</Link>
          <Link href="#services" className="hover:text-blue-500">Services</Link>
          <Link href="#projects" className="hover:text-blue-500">Projects</Link>
          <Link href="#contact" className="hover:text-blue-500">Contact</Link>
        </nav>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://github.com/fran-897-uinx" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 hover:text-blue-500 transition" />
          </a>
          <a href="https://www.linkedin.com/in/francis-prevail-39b800359/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 hover:text-blue-500 transition" />
          </a>
          {/* <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 hover:text-blue-500 transition" />
          </a> */}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Francis David. All rights reserved.
      </div>
    </footer>
  );
}
