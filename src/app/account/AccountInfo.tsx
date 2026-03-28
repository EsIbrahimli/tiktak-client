"use client";

import styles from "./account.module.css";
import { useEffect, useRef, useState } from "react";
import { useAccountStore } from "@/common/store/accountStore";
import { useAuthStore } from "@/common/store/authStore";
import { toast } from "react-toastify";

interface AccountForm {
  name: string;
  email: string;
  phone: string;
  adress: string;
  password: string;
  passwordConfirm: string;
}

type RequiredField = "name" | "email" | "phone" | "adress";

export default function AccountInfo() {
  const { account, fetchAccount, updateAccountData } = useAccountStore();
  const { login } = useAuthStore();
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [errorFields, setErrorFields] = useState<Partial<Record<keyof AccountForm, boolean>>>({});
  const [touched, setTouched] = useState<Record<RequiredField, boolean>>({
    name: false,
    email: false,
    phone: false,
    adress: false,
  });

  const [form, setForm] = useState<AccountForm>({
    name: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  const getVisibleValue = (field: RequiredField, accountValue: string): string => {
    return touched[field] ? form[field] : form[field] || accountValue;
  };

  const handleSubmit = async () => {
    const resolvedName = getVisibleValue("name", account?.name || "").trim();
    const resolvedEmail = getVisibleValue("email", account?.email || "").trim();
    const resolvedPhone = getVisibleValue("phone", account?.phone ? String(account.phone) : "").trim();
    const resolvedAdress = getVisibleValue("adress", account?.adress || "").trim();

    const nextErrors: Partial<Record<keyof AccountForm, boolean>> = {};
    if (!resolvedName) nextErrors.name = true;
    if (!resolvedEmail) nextErrors.email = true;
    if (!resolvedPhone) nextErrors.phone = true;
    if (!resolvedAdress) nextErrors.adress = true;

    if (Object.keys(nextErrors).length > 0) {
      setErrorFields(nextErrors);
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
      errorTimerRef.current = setTimeout(() => {
        setErrorFields({});
      }, 3000);
      toast.error("Boş xanaları doldurun.");
      return;
    }

    if (form.password && form.password !== form.passwordConfirm) {
      toast.error("Şifrələr eyni deyil.");
      return;
    }

    const payload = {
      name: resolvedName,
      email: resolvedEmail,
      phone: resolvedPhone,
      adress: resolvedAdress,
      ...(form.password
        ? {
            password: form.password,
            password_confirm: form.passwordConfirm,
          }
        : {}),
    };

    const success = await updateAccountData(payload);

    if (success) {
      setForm((prev) => ({ ...prev, password: "", passwordConfirm: "" }));
      if (form.password) {
        try {
          await login({ phone: resolvedPhone, password: form.password });
          toast.success("Məlumatlar yeniləndi və yenidən giriş edildi.");
        } catch {
          toast.success("Məlumatlarınız uğurla yeniləndi.");
          toast.error("Yenidən giriş alınmadı.");
        }
      } else {
        toast.success("Məlumatlarınız uğurla yeniləndi.");
      }
      return;
    }

    toast.error("Yeniləmə zamanı xəta baş verdi.");
  };

  return (
    <div className={styles.accountInfo}>
      <h2 className={styles.title}>Əlaqə məlumatınız</h2>
      <div className={styles.form}>
        <div className={styles.formItem}>
        <div className={styles.formName}>
        <label>Adınız</label>
        <input
          className={`${styles.input} ${errorFields.name ? styles.inputError : ""}`}
          value={getVisibleValue("name", account?.name || "")}
          onChange={(e) => {
            setTouched((prev) => ({ ...prev, name: true }));
            setForm({ ...form, name: e.target.value });
          }}
          placeholder="Adınız"
        />
        </div>
        <div className={styles.formPhone}>
         <label htmlFor="">Telefon nönrəsi</label>
        <input
          className={`${styles.input} ${errorFields.phone ? styles.inputError : ""}`}
          value={getVisibleValue("phone", account?.phone ? String(account.phone) : "")}
          onChange={(e) => {
            setTouched((prev) => ({ ...prev, phone: true }));
            setForm({ ...form, phone: e.target.value });
          }}
          placeholder="Telefon"
        />
         </div>
          </div>
          <div className={styles.formItem}>
         <div className={styles.formEmail}>
          <label htmlFor="">Email</label>
        <input
          className={`${styles.input} ${errorFields.email ? styles.inputError : ""}`}
          value={getVisibleValue("email", account?.email || "")}
          onChange={(e) => {
            setTouched((prev) => ({ ...prev, email: true }));
            setForm({ ...form, email: e.target.value });
          }}
          placeholder="Email"
        />
        </div>
        <div className={styles.formAdress}>
          <label htmlFor="">Ünvan</label>
          <input
            className={`${styles.input} ${errorFields.adress ? styles.inputError : ""}`}
            value={getVisibleValue("adress", account?.adress || "")}
            onChange={(e) => {
              setTouched((prev) => ({ ...prev, adress: true }));
              setForm({ ...form, adress: e.target.value });
            }}
            placeholder="Ünvan"
          />
        </div>
        </div>
        <div  className={styles.passwordSection}>
          <h1>Şifrənin yenilənməsi</h1>
          <h2>Ehtiyac yoxdursa boş buraxın</h2>
        </div>
        <div className={styles.formItem}>
        <div className={styles.formPassword}>
        <label htmlFor="">Yeni şifrə</label>
        <input
          className={styles.input}
          type="password"
          value={form.password || ""}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Yeni şifrə"
        />
        </div>
         <div className={styles.formPasswordConfirm}>
         <label htmlFor="">Yeni şifrənin təkrarı</label>
        <input
          className={styles.input}
          type="password"
          value={form.passwordConfirm || ""}
          onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
          placeholder="Yeni şifrənin təkrarı"
        />
        </div>
        </div>
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        Məlumatları yenilə
      </button>
    </div>
  );
}