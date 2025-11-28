// services/about.ts
import { fetchData } from "./api";

export async function getAbout() {
  try {
    const data = await fetchData("/about/");
    // Return first item if array
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Failed to fetch About data:", error);
    return null;
  }
}
