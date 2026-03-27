import { create } from "zustand";
import { Product, getProductsByCategory } from "@/services/productsApi";

interface ProductsState {
  products: Product[];
  loading: boolean;
  fetchProductsByCategory: (categoryId: number) => Promise<void>;
}

const normalizeProducts = (res: unknown): Product[] => {
  if (Array.isArray(res)) return res as Product[];

  if (res && typeof res === "object") {
    const r = res as Record<string, unknown>;
    if (typeof r.id === "number") return [r as unknown as Product];
    if (Array.isArray(r.data)) return r.data as Product[];
    if (Array.isArray(r.products)) return r.products as Product[];
    const data = r.data as Record<string, unknown> | undefined;
    if (data && typeof data.id === "number") return [data as unknown as Product];
    if (data && Array.isArray(data.data)) return data.data as Product[];
    if (data && Array.isArray(data.products)) return data.products as Product[];
  }

  return [];
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,

  fetchProductsByCategory: async (categoryId) => {
    set({ loading: true });
    try {
      const res = await getProductsByCategory(categoryId);
      console.log("Fetched products response:", res);
      set({ products: normalizeProducts(res) });
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
