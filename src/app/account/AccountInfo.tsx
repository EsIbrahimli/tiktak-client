"use client";

import styles from "./account.module.css";
import { useEffect, useState } from "react";
import { useAccountStore } from "@/common/store/accountStore";
import toast from "react-hot-toast";

export default function AccountInfo() {
  const { account, fetchAccount, updateAccountData } = useAccountStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
  });

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    if (account) {
      setForm({
        name: account.name || "",
        email: account.email || "",
        phone: account.phone || "",
        title: account.title || "",
      });
    }
  }, [account]);

  const handleSubmit = async () => {
    const success = await updateAccountData(form);

    if (success) {
      toast.success("Məlumatlarınız uğurla yeniləndi.", {
        icon: "✅",
      });
    }
  };

  return (
    <div>
      <h2>Əlaqə məlumatınız</h2>

      <div className={styles.formGrid}>
        <input
          className={styles.input}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Adınız"
        />

        <input
          className={styles.input}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Telefon"
        />

        <input
          className={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />

        <input
          className={styles.input}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Başlıq"
        />
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        Məlumatları yenilə
      </button>
    </div>
  );
}