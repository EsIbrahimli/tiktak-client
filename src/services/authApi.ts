import { axiosInstance } from "./axiosInstance";


const normalizePhone = (value: string) => {
  const trimmed = value.trim();
  let digitsOnly = trimmed.replace(/\D/g, "");

  if (!digitsOnly) return trimmed;

  if (digitsOnly.startsWith("00")) {
    digitsOnly = digitsOnly.slice(2);
  }

  if (digitsOnly.startsWith("9940") && digitsOnly.length === 13) {
    digitsOnly = `994${digitsOnly.slice(4)}`;
  }

  if (digitsOnly.length === 10 && digitsOnly.startsWith("0")) {
    digitsOnly = `994${digitsOnly.slice(1)}`;
  }

  if (digitsOnly.length === 9) {
    digitsOnly = `994${digitsOnly}`;
  }

  return `+${digitsOnly}`;
};


const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
const isPhone = (value: string) => /^\+?\d{7,15}$/.test(value.replace(/\s/g, ""));


export interface Account {
  id: number;
  name: string;
  email: string;
  phone?: string;
}


export const getAccount = async (): Promise<Account> => {
  const res = await axiosInstance.get("/auth/account");
  return res.data;
};

export const updateAccount = async (data: Partial<Account>): Promise<Account> => {
  const res = await axiosInstance.put("/auth/account", data);
  return res.data;
};


export const AuthApi = {
  login: async (identifier: string, password: string) => {
    let payload: any = { password };

    if (isEmail(identifier)) payload.email = identifier.trim();
    else if (isPhone(identifier)) payload.phone = normalizePhone(identifier);
    else payload.username = identifier.trim();

    const res = await axiosInstance.post("/auth/admin/login", payload);
    return res.data;
  },
};