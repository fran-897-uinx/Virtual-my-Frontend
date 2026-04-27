import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "David Francis | Backend Developer,Website Optimizer & System Engineer",
  description:
    "As De-Ghost, I specialize in:Custom website development E-commerce solutions (WooCommerce & modern tools) Website optimization and performance improvement Debugging and fixing broken or slow websites My mission is simple: Build powerful websites and eliminate issues that affect performance and user experience.",
  keywords: [
    "David Francis",
    "De-Ghost",
    "python",
    "Django",
    "Docker",
    "javascript",
    "Backend Developer",
    "Website Optimizer",
    "System Engineer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          className="border-blue-300 border-2 rounded-4xl"
          rel="icon"
          type="image/png/jpeg"
          sizes="16x16"
          href="/ruk.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
