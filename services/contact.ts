import { fetchData } from "./api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://code-port-backend.onrender.com/api";

async function getCsrfToken() {
  const name = "csrftoken";
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];

  if (cookieValue) return cookieValue;

  try {
    const res = await fetch(`${BASE_URL}/csrf/`, {
      credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
  } catch {
    return "";
  }
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const csrfToken = await getCsrfToken();

  return fetchData("/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(formData),
    credentials: "include", // include cookies for CSRF
  });
}
