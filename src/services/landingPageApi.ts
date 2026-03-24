import {axiosInstance} from "./axiosInstance";

export interface Slide {
  id: number;
  name: string;
  img_url: string;
  description: string;
}

export const getSlides = async (): Promise<Slide[]> => {
  try {
    const res = await axiosInstance.get("/tiktak/categories"); // endpoint sənin API
    return res.data.data; // API `data` içində göndərir
  } catch (err) {
    console.error("Failed to fetch slides", err);
    return [];
  }
};