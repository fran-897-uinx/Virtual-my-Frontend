import { fetchData } from "./api";

async function getCsrfToken() {
  // Try from cookie first
  const name = "csrftoken";
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name))
    ?.split("=")[1];

  if (cookieValue) return cookieValue;

  // Fallback: request from backend
  try {
    const res = await fetch("http://127.0.0.1:8000/api/csrf/", {
      credentials: "include", // important
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
