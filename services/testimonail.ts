export async function createTestimonial(data: FormData) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://code-port-backend.onrender.com/api";

  const res = await fetch(`${baseUrl}/testimonials/`, {
    method: "POST",
    body: data,
  });

  return res.json();
}
