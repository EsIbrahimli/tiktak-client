import { axiosInstance } from "./axiosInstance";

export const getFavorites = async () => {
  const res = await axiosInstance.get("/products/favorites"); // endpoint-ə görə dəyiş
  return res.data.data; // array of products
};