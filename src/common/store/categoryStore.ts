import { create } from "zustand";
import {
  getCategories,
  getCategoryBySlug,
  Category,
} from "@/services/categoryApi";

interface CategoriesState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;

  fetchCategories: () => Promise<void>;
  fetchCategoryBySlug: (slug: string) => Promise<void>;
}


const normalizeCategories = (res: unknown): Category[] => {
  if (Array.isArray(res)) return res as Category[];

  if (res && typeof res === "object") {
    const r = res as any;

    if (Array.isArray(r.data)) return r.data;
    if (Array.isArray(r.categories)) return r.categories;
    if (Array.isArray(r?.data?.data)) return r.data.data;
    if (Array.isArray(r?.data?.categories)) return r.data.categories;
  }

  return [];
};

const normalizeCategory = (res: unknown): Category | null => {
  if (!res || typeof res !== "object") return null;

  const r = res as any;

  if (r.id) return r;
  if (r.data?.id) return r.data;
  if (r.category?.id) return r.category;
  if (r.data?.category?.id) return r.data.category;

  return null;
};

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await getCategories();

      console.log("CATEGORIES:", res); // debug

      const data = normalizeCategories(res);

      set({ categories: data });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchCategoryBySlug: async (slug: string) => {
    set({ loading: true });
    try {
      const res = await getCategoryBySlug(slug);

      console.log("CATEGORY:", res); // debug

      const data = normalizeCategory(res);

      set({ selectedCategory: data });
    } catch (err) {
      console.error("Fetch slug error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));