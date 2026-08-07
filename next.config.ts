import { hostname } from "os";

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Deployed backend
      {
        protocol: "https",
        hostname: "code-port-backend.onrender.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      // Local backend (127.0.0.1)
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8050",
        pathname: "/media/**",
      },

      // Local backend (localhost)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8050",
        pathname: "/media/**",
      },
    ],
  },
};
