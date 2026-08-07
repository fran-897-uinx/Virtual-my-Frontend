import GalleryContent from "./GalleryContent";

export const dynamic = "force-dynamic";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

async function fetchGallery() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://code-port-backend.onrender.com/api";
    const res = await fetch(`${baseUrl}/gallery/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.results || [];
    return list;
  } catch (err) {
    console.error("SSR fetch gallery failed:", err);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await fetchGallery();
  return (
    <>
      <Navbar />
      <GalleryContent initialImages={images} />
      <Footer />
    </>
  );
}
