import axios from "axios";

export interface Order {
  id: number;
  createdAt: string;
  totalAmount: number;
  totalItems: number;
  status: string;
}

export const getOrders = async () => {
  const res = await axios.get("/api/orders");
  return res.data;
};

export const getOrderById = async (id: number | string) => {
  const res = await axios.get(`/api/orders/${id}`);
  return res.data;
};