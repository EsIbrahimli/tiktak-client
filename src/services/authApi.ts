import { axiosInstance } from "./axiosInstance";

export interface LoginApiResponse {
  data: {
    data: { 
    tokens: {
      access_token: string;
    };
  };
}
}

export interface SignupApiResponse {
  data?: {
    data?: {
    tokens?: {
      access_token?: string;
    };
  };
}
}

export const loginApi = async (phone: string, password: string): Promise<LoginApiResponse> => {
  try {
    const response = await axiosInstance.post("/auth/login", { phone, password });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerApi = async (
  fullName: string,
  phone: string,
  password: string
): Promise<SignupApiResponse> => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      full_name: fullName,
      phone,
      password,
    });
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

