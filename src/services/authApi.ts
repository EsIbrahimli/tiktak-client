import { axiosInstance } from "./axiosInstance";

export interface Account {
  id?: string | number;
  name?: string;
  full_name?: string;
  email?: string;
  phone?: number | string;
  adress?: string;
  password?: string;
  password_confirm?: string;
}

export interface AuthApiResponse {
  data?: {
    data?: {
      tokens?: {
        access_token?: string;
      };
    };
  };
}

export type LoginApiResponse = AuthApiResponse;
export type SignupApiResponse = AuthApiResponse;

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

export const getAccount = async (): Promise<Account> => {
  try {
    const response = await axiosInstance.get("/profile");
    const data = (response.data?.data ?? response.data ?? {}) as Record<string, unknown>;

    return {
      id: data.id as string | number | undefined,
      name: (data.name as string | undefined) ?? (data.full_name as string | undefined) ?? "",
      full_name: data.full_name as string | undefined,
      email: (data.email as string | undefined) ?? "",
      phone: (data.phone as number | undefined) ?? "",
      password: undefined, // Şifrə serverdən gəlməməlidir
      password_confirm: undefined,
      adress: data.adress as string | undefined,
    };
  } catch (error) {
    console.error("Get account error:", error);
    throw error;
  }
};

export const updateAccount = async (payload: Partial<Account>): Promise<Account> => {
  try {
    const fullName = (payload.name ?? payload.full_name ?? "").toString().trim();
    const phone = (payload.phone ?? "").toString().trim();
    const email = (payload.email ?? "").toString().trim();
    const adress = (payload.adress ?? "").toString().trim();
    const password = (payload.password ?? "").toString().trim();
    const passwordConfirm = (payload.password_confirm ?? "").toString().trim();

    const baseBody: Record<string, string> = {
      full_name: fullName,
      phone,
    };

    if (password) {
      baseBody.password = password;
      baseBody.password_confirm = passwordConfirm;
    }

    const variants: Array<Record<string, string>> = [
      { ...baseBody, ...(email ? { email } : {}), ...(adress ? { adress } : {}) },
      { ...baseBody, ...(email ? { email } : {}), ...(adress ? { address: adress } : {}) },
      { ...baseBody, ...(adress ? { adress } : {}) },
      { ...baseBody, ...(adress ? { address: adress } : {}) },
      { ...baseBody },
    ];

    let lastError: unknown = null;

    for (const body of variants) {
      try {
        await axiosInstance.put("/profile", body);
        lastError = null;
        break;
      } catch (error) {
        const status = (error as { response?: { status?: number } })?.response?.status;
        lastError = error;
        if (status !== 400) {
          throw error;
        }
      }
    }

    if (lastError) {
      throw lastError;
    }

    // Yenilənmiş məlumatı birbaşa profildən götürürük ki həmişə doğru olsun.
    return await getAccount();
  } catch (error) {
    console.error("Update account error:", error);
    throw error;
  }
};
