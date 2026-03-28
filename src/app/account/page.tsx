"use client";
import { IoMdPerson } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import styles from "./account.module.css";
import AccountInfo from "./AccountInfo";
import OrdersPage from "./orders/page";

export default function AccountPage() {
  const params = useSearchParams();
  const section = params.get("section");

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <h3>Hesabım</h3>
        <a
          href="/account"
          className={`${styles.menuItem} ${!section ? styles.active : ""
            }`}
        >
          <IoMdPerson style={{ marginRight: 8 }} />
          Hesab məlumatlarım
        </a>
        <a
          href="/account?section=orders"
          className={`${styles.menuItem} ${section === "orders" ? styles.active : ""
            }`}
        >
          <MdShoppingBag style={{ marginRight: 8 }} />
          Sifarişlərim
        </a>
      </div>
      <div className={styles.content}>
        {section === "orders" ? <OrdersPage /> : <AccountInfo />}
      </div>
    </div>
  );
}