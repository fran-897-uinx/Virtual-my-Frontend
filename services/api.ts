// src/services/api.ts
export async function fetchData(
  endpoint: string,
  options: RequestInit = {}
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://code-port-backend.onrender.com/api";

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("API Error Response:", errorData);
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}
