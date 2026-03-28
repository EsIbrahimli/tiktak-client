import { axiosInstance } from "./axiosInstance";

export interface Order {
  id: number;
  createdAt: string;
  totalAmount?: number;
  totalItems: number | { quantity?: number };
  address?: string;
  items?: {
    total_price?: number;
  };
  status: string;
}

export const getOrders = async () => {
  try {
    const res = await axiosInstance.get("/orders/user");
    return res.data;
  } catch {
    const res = await axiosInstance.get("/orders");
    return res.data;
  }
};

export const getOrderById = async (id: number | string) => {
  try {
    const res = await axiosInstance.get(`/orders/user/${id}`);
    return res.data;
  } catch {
    const res = await axiosInstance.get(`/orders/${id}`);
    return res.data;
  }
};