import { fetchData } from "./api";

export async function getHome() {
  return fetchData("/home/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
