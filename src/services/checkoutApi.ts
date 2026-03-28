import { axiosInstance } from "./axiosInstance";

export interface CheckoutItemPayload {
	productId: number;
	quantity: number;
}

export interface CheckoutPayload {
	total: string;
	deliveryFee: string;
	paymentMethod: string;
	note: string;
	address: string;
	phone: string;
	items: CheckoutItemPayload[];
}

export const createCheckoutOrder = async (payload: CheckoutPayload) => {
	const response = await axiosInstance.post("/orders/checkout", payload);
	return response.data;
};
