import { create } from "zustand";
import {
    addToBasket,
    Basket,
    BasketItem,
    clearBasket,
    deleteAllFromBasket,
    getBasket,
    removeFromBasket,
} from "@/services/basketApi";

interface BasketState {
    items: BasketItem[];
    total_price: number;
    loading: boolean;
    error: string | null;
    setBasket: (basket: Basket) => void;
    fetchBasket: () => Promise<void>;
    addItem: (productId: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    removeAllOfItem: (productId: number) => Promise<void>;
    clearAll: () => Promise<void>;
}

export const useBasketStore = create<BasketState>((set) => ({
    items: [],
    total_price: 0,
    loading: false,
    error: null,

    setBasket: (basket) =>
        set({
            items: basket.items,
            total_price: basket.total_price,
        }),

    fetchBasket: async () => {
        set({ loading: true, error: null });
        try {
            const basket = await getBasket();
            set({ items: basket.items, total_price: basket.total_price });
        } catch (error) {
            console.error("Fetch basket error:", error);
            set({ error: "Basket yüklənmədi" });
        } finally {
            set({ loading: false });
        }
    },

    addItem: async (productId) => {
        set({ loading: true, error: null });
        try {
            const basket = await addToBasket(productId);
            set({ items: basket.items, total_price: basket.total_price });
        } catch (error) {
            console.error("Add basket item error:", error);
            set({ error: "Məhsul səbətə əlavə olunmadı" });
        } finally {
            set({ loading: false });
        }
    },

    removeItem: async (productId) => {
        set({ loading: true, error: null });
        try {
            const basket = await removeFromBasket(productId);
            set({ items: basket.items, total_price: basket.total_price });
        } catch (error) {
            console.error("Remove basket item error:", error);
            set({ error: "Məhsul səbətdən silinmədi" });
        } finally {
            set({ loading: false });
        }
    },

    removeAllOfItem: async (productId) => {
        set({ loading: true, error: null });
        try {
            const basket = await deleteAllFromBasket(productId);
            set({ items: basket.items, total_price: basket.total_price });
        } catch (error) {
            console.error("Remove all basket item error:", error);
            set({ error: "Məhsul tam silinmədi" });
        } finally {
            set({ loading: false });
        }
    },

    clearAll: async () => {
        set({ loading: true, error: null });
        try {
            const basket = await clearBasket();
            set({ items: basket.items, total_price: basket.total_price });
        } catch (error) {
            console.error("Clear basket error:", error);
            set({ error: "Səbət təmizlənmədi" });
        } finally {
            set({ loading: false });
        }
    },
}));

