import { axiosInstance } from "./axiosInstance";

export interface BasketItem {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    total_price: number;
}

export interface Basket {
    items: BasketItem[];
    total_price: number;
}

export const getBasket = async (): Promise<Basket> => {
    const response = await axiosInstance.get<Basket>("/basket");
    return response.data;
};

export const addToBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosInstance.post<Basket>(`/basket/${productId}/add`);
    return response.data;
};

export const removeFromBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosInstance.post<Basket>(`/basket/${productId}/remove`);
    return response.data;
};

export const clearBasket = async (): Promise<Basket> => {
    const response = await axiosInstance.post<Basket>("/basket/clear");
    return response.data;
};

export const deleteAllFromBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosInstance.delete<Basket>(`/basket/${productId}/remove-all`);
    return response.data;
};