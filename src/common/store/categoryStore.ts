import { create } from "zustand";
import {
  getCategories,
  Category,
} from "@/services/categoryApi";

interface CategoriesState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;

  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: number) => Promise<void>;
}


const normalizeCategories = (res: unknown): Category[] => {
  if (Array.isArray(res)) return res as Category[];

  if (res && typeof res === "object") {
    const r = res as Record<string, unknown>;

    if (Array.isArray(r.data)) return r.data as Category[];
    if (Array.isArray(r.categories)) return r.categories as Category[];
    const d = r.data as Record<string, unknown> | undefined;
    if (d && Array.isArray(d.data)) return d.data as Category[];
    if (d && Array.isArray(d.categories)) return d.categories as Category[];
  }

  return [];
};

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  selectedCategory: null,
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await getCategories();
      const data = normalizeCategories(res);
      set({ categories: data });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchCategoryById: async (id: number) => {
    const found = get().categories.find((c) => c.id === id);
    if (found) {
      set({ selectedCategory: found });
      return;
    }
    // Categories not loaded yet — load all then pick
    set({ loading: true });
    try {
      const res = await getCategories();
      const data = normalizeCategories(res);
      set({ categories: data });
      const match = data.find((c) => c.id === id) ?? null;
      set({ selectedCategory: match });
    } catch (err) {
      console.error("Fetch category by id error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));