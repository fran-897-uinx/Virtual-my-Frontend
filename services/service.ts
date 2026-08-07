import { fetchData } from "./api";

export interface Service {
  id: number;
  title: string;
  icon: string; // name of react-icon
  description: string;
}

export async function getServices(): Promise<Service[]> {
  return fetchData("/services/");
}
