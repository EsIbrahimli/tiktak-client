import { create } from "zustand";
import {
  getOrders,
  getOrderById,
  Order,
} from "@/services/orderApi";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;

  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: number | string) => Promise<void>;
}

const normalizeOrders = (res: unknown): Order[] => {
  if (Array.isArray(res)) return res as Order[];

  if (res && typeof res === "object") {
    const r = res as any;

    if (Array.isArray(r.data)) return r.data;
    if (Array.isArray(r.orders)) return r.orders;
    if (Array.isArray(r?.data?.data)) return r.data.data;
    if (Array.isArray(r?.data?.orders)) return r.data.orders;
  }

  return [];
};


const normalizeOrder = (res: unknown): Order | null => {
  if (!res || typeof res !== "object") return null;

  const r = res as any;

  if (r.id) return r;
  if (r.data?.id) return r.data;
  if (r.order?.id) return r.order;
  if (r.data?.order?.id) return r.data.order;

  return null;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  selectedOrder: null,
  loading: false,


  fetchOrders: async () => {
    set({ loading: true });

    try {
      const res = await getOrders();
      console.log("ORDERS RESPONSE:", res);

      const data = normalizeOrders(res);

      set({ orders: data });
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      set({ loading: false });
    }
  },

  
  fetchOrderById: async (id) => {
    set({ loading: true });

    try {
      const res = await getOrderById(id);
      console.log("ORDER DETAIL:", res);

      const data = normalizeOrder(res);

      set({ selectedOrder: data });
    } catch (err) {
      console.error("Fetch order detail error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));