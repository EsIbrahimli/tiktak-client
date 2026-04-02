import { create } from "zustand";
import { Product, getProductsByCategory } from "@/services/productsApi";

interface ProductsState {
  products: Product[];
  loading: boolean;
  fetchProductsByCategory: (categoryId: number) => Promise<void>;
}

const normalizeProduct = (p: unknown): Product => {
  const item = p as Record<string, unknown>;
  return {
    ...item,
    id: (item.id ?? item.product_id) as number,
  } as Product;
};

const normalizeProducts = (res: unknown): Product[] => {
  let arr: unknown[] | null = null;

  if (Array.isArray(res)) {
    arr = res;
  } else if (res && typeof res === "object") {
    const r = res as Record<string, unknown>;
    if (typeof r.id === "number") arr = [r];
    else if (Array.isArray(r.data)) arr = r.data;
    else if (Array.isArray(r.products)) arr = r.products;
    else {
      const data = r.data as Record<string, unknown> | undefined;
      if (data && typeof data.id === "number") arr = [data];
      else if (data && Array.isArray(data.data)) arr = data.data;
      else if (data && Array.isArray(data.products)) arr = data.products;
    }
  }

  return (arr ?? []).map(normalizeProduct);
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  loading: false,

  fetchProductsByCategory: async (categoryId) => {
    set({ loading: true });
    try {
      const res = await getProductsByCategory(categoryId);
      set({ products: normalizeProducts(res) });
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
