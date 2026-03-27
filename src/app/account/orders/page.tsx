"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/common/store/orderStore";
import styles from "../account.module.css";

export default function OrdersPage() {
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Sifariş Tarixçəsi</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Xeyr</th>
            <th>Tarix</th>
            <th>Məhsul sayı</th>
            <th>Məbləğ</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>{o.totalItems}</td>
              <td>{o.totalAmount} ₼</td>
              <td>
                <span
                  className={`${styles.status} ${
                    o.status === "delivered"
                      ? styles.success
                      : styles.pending
                  }`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}