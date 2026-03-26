import { axiosInstance } from "./axiosInstance";

export interface Category {
  id: number;
  name: string;
  slug: string;
  img_url: string;
  description: string;
  created_at: string;
}

// GET ALL
export const getCategories = async (): Promise<unknown> => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};

// GET BY SLUG
export const getCategoryBySlug = async (slug: string): Promise<unknown> => {
  const res = await axiosInstance.get(`/categories/${slug}`);
  return res.data;
};