import { fetchData } from "./api";

export async function getAbout() {
  return fetchData("/about/");
}
