"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/common/store/orderStore";
import styles from "../account.module.css";

export default function OrdersPage() {
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className={styles.orders}>
      <h2>Sifariş Tarixçəsi</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Tarix</th>
            <th>Məhsul sayı</th>
            <th>Çatdırılma ünvanı</th>
            <th>Subtotal/Çatdırıma</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}
              </td>
              <td>
                {typeof o.totalItems === "number"
                  ? o.totalItems
                  : (o.totalItems as { quantity?: number })?.quantity ?? 0}
              </td>
              <td>{o.address ?? "-"}</td>
              <td>
                {(o.totalAmount ?? o.items?.total_price ?? 0)} ₼
              </td>
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