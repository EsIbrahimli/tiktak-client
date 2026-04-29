import { create } from "zustand";
import { loginApi, registerApi } from "../../services/authApi";

export interface LoginRequest {
	phone: string;
	password: string;
}

export interface RegisterRequest {
	fullName: string;
	phone: string;
	password: string;
}

export interface AuthResponse {
	token: string;
}

interface AuthState {
	loading: boolean;
	token: string | null;
	savedPhone: string
	savedPassword: string
	login: (payload: LoginRequest) => Promise<AuthResponse>;
	signup: (payload: RegisterRequest) => Promise<AuthResponse | null>;
	logout: () => void;
}

const getStoredToken = (): string | null => {
	if (typeof window === "undefined") {
		return null;
	}

	return localStorage.getItem("token");
};

export const useAuthStore = create<AuthState>((set) => ({
	loading: false,
	token: getStoredToken(),
	savedPhone: typeof window !== "undefined" ? (localStorage.getItem("savedPhone") ?? "+994559916601") : "+994559916601",
	savedPassword: '1234',
	login: async (payload) => {
		set({ loading: true });
		try {
			const response = await loginApi(payload.phone, payload.password);
			const token = response.data?.data?.tokens?.access_token;
			if (!token) {
				throw new Error("Access token tapilmadi");
			}
			localStorage.setItem("savedPhone", payload.phone)
			localStorage.setItem("token", token);
			set({ token });
			return { token };
		} finally {
			set({ loading: false });
		}
	},

	signup: async (payload) => {
		set({ loading: true });
		try {
			const response = await registerApi(payload.fullName, payload.phone, payload.password);
			const token = response.data?.data?.tokens?.access_token;
			if (token) {
				localStorage.setItem("token", token);
				set({ token });
				return { token };
			}
			return null;
		} finally {
			set({ loading: false });
		}
	},
	logout: () => {
		localStorage.removeItem("token");
		set({ token: null, savedPassword: '' });
	},
}));


