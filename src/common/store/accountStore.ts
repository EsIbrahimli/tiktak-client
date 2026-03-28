import { create } from "zustand";
import { getAccount, updateAccount, Account} from "@/services/authApi";

interface AccountState {
  account: Account | null;
  loading: boolean;

  fetchAccount: () => Promise<void>;
  updateAccountData: (data: Partial<Account>) => Promise<boolean>;
}

export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  loading: false,

  fetchAccount: async () => {
    set({ loading: true });
    try {
      const account = await getAccount();
      set({ account });
    } catch (err) {
      console.error("Fetch account error:", err);
    } finally {
      set({ loading: false });
    }
  },

  updateAccountData: async (formData) => {
    set({ loading: true });
    try {
      const account = await updateAccount(formData);
      set({ account });
      return true;
    } catch (err) {
      console.error("Update account error:", err);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));