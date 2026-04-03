import { axiosInstance } from "./axiosInstance";

export interface BasketItem {
    product_id: number;
    name: string;
    title?: string;
    price: number;
    quantity: number;
    total_price: number;
    img_url?: string;
    url?: string;
}

export interface Basket {
    items: BasketItem[];
    total_price: number;
}

const normalizeItems = (arr: unknown[]): BasketItem[] =>
    arr.map((i) => {
        const item = i as Record<string, unknown>;
        const product = (item.product as Record<string, unknown> | undefined) ?? {};
        const resolvedProductId = Number(item.product_id ?? product.id ?? item.id ?? 0);

        return {
            ...item,
            product_id: resolvedProductId,
            title: String(item.title ?? product.title ?? item.name ?? product.name ?? ""),
            name: String(item.name ?? product.name ?? item.title ?? product.title ?? ""),
            img_url: String(item.img_url ?? item.url ?? product.img_url ?? product.url ?? ""),
            url: String(item.url ?? item.img_url ?? product.url ?? product.img_url ?? ""),
        } as BasketItem;
    });

const normalizeBasket = (raw: unknown): Basket => {
    if (raw && typeof raw === "object") {
        const r = raw as Record<string, unknown>;
        // { data: { items: [...], total_price: ... } }
        if (r.data && typeof r.data === "object") {
            const d = r.data as Record<string, unknown>;
            if (Array.isArray(d.items)) {
                return { items: normalizeItems(d.items), total_price: Number(d.total_price ?? 0) };
            }
        }
        // { items: [...], total_price: ... }
        if (Array.isArray(r.items)) {
            return { items: normalizeItems(r.items), total_price: Number(r.total_price ?? 0) };
        }
    }
    return { items: [], total_price: 0 };
};

export const getBasket = async (): Promise<Basket> => {
    const response = await axiosInstance.get("/basket");
    return normalizeBasket(response.data);
};

export const addToBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosInstance.post(`/basket/${productId}/add`);
    return normalizeBasket(response.data ?? response);
};

export const removeFromBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosInstance.post(`/basket/${productId}/remove`);
    return normalizeBasket(response.data);
};

export const clearBasket = async (): Promise<Basket> => {
    const response = await axiosInstance.post("/basket/clear");
    return normalizeBasket(response.data ?? response);
};

export const deleteAllFromBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosInstance.delete(`/basket/${productId}/remove-all`);
    return normalizeBasket(response.data ?? response);
};