import { axiosInstance } from "./axiosInstance";
import axios from "axios";

export interface Product {
  id: number;
  title?: string;
  name?: string;
  price: number;
  img_url: string;
  description?: string;
  slug?: string;
  unit?: string;
  category_id?: number;
  category?: {
    id?: number;
    slug?: string;
    name?: string;
  };
}

export const getProductsByCategory = async (categoryId: number): Promise<unknown> => {
  const requests = [
    () => axiosInstance.get(`/products/${categoryId}`),
    () => axiosInstance.get(`/products`, { params: { category: categoryId } }),
    () => axiosInstance.get(`/products`, { params: { category_id: categoryId } }),
  ];

  let lastError: unknown;

  for (const request of requests) {
    try {
      const res = await request();
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 404) {
          lastError = error;
          continue;
        }
      }
      throw error;
    }
  }

  throw lastError ?? new Error("Products fetch failed");
};
