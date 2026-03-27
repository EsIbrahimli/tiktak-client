import { create } from "zustand";
import { getAccount, updateAccount, Account } from "@/services/authApi";

interface AccountState {
  account: Account | null;
  loading: boolean;

  fetchAccount: () => Promise<void>;
  updateAccountData: (data: Partial<Account>) => Promise<boolean>;
}

const normalizeAccount = (res: unknown): Account | null => {
  if (!res || typeof res !== "object") return null;

  const r = res as Record<string, any>;

  if (r.id) return r;
  if (r.data?.id) return r.data;
  if (r.user?.id) return r.user;
  if (r.data?.user?.id) return r.data.user;

  return null;
};

export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  loading: false,

  fetchAccount: async () => {
    set({ loading: true });
    try {
      const res = await getAccount();
      const data = normalizeAccount(res);
      set({ account: data });
    } catch (err) {
      console.error("Fetch account error:", err);
    } finally {
      set({ loading: false });
    }
  },

  updateAccountData: async (formData) => {
    set({ loading: true });
    try {
      const res = await updateAccount(formData);
      const data = normalizeAccount(res);
      if (data) {
        set({ account: data });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Update account error:", err);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));