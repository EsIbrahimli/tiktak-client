import { create } from "zustand";
import { login as loginApi, register as registerApi } from "../../services/authApi";

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
	login: async (payload) => {
		set({ loading: true });
		try {
			const response = await loginApi(payload.phone, payload.password);
			const token = response.data?.data?.tokens?.access_token;
			if (!token) {
				throw new Error("Access token tapilmadi");
			}

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
		set({ token: null });
	},
}));


