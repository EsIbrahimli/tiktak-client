import { create } from "zustand";
import { getFavorites } from "@/services/favoritesApi";

interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  img_url?: string;
}

interface FavoriteState {
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
  fetchFavorites: () => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],

  toggleFavorite: (item) => {
    const exists = get().favorites.find((f) => f.id === item.id);

    if (exists) {
      set({
        favorites: get().favorites.filter((f) => f.id !== item.id),
      });
    } else {
      set({
        favorites: [...get().favorites, item],
      });
    }
  },

  isFavorite: (id) => {
    return get().favorites.some((f) => f.id === id);
  },

  fetchFavorites: async () => {
    try {
      const data = await getFavorites(); // backend API çağırışı
      set({ favorites: Array.isArray(data) ? data : [] });
    } catch (err) {
      console.error("Favorites fetch error:", err);
      set({ favorites: [] });
    }
  }
}));