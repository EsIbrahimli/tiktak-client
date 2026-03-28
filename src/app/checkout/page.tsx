"use client";
import { useState } from "react";
import styles from "./checkout.module.css";
export default function Checkout() {
   const [payment, setPayment] = useState("cash");

  return(
  <div className={styles.container}>
      <div className={styles.breadcrumb}>Ana səhifə / Meyvələr</div>
      <div className={styles.title}>Sifarişin tamamlanması</div>

      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.infoRow}>
            <div>
              <div className={styles.label}>Adınız</div>
              <div className={styles.value}>Admin</div>
            </div>

            <div>
              <div className={styles.label}>Əlavə qeyd</div>
              <textarea
                className={styles.textarea}
                placeholder="Əlavə qeydiniz varsa buraya daxil edin"
              />
            </div>
          </div>

          <div className={styles.infoRow}>
            <div>
              <div className={styles.label}>Ünvanınız</div>
              <div className={styles.value}>-</div>
            </div>

            <div>
              <div className={styles.label}>Nömrəniz</div>
              <div className={styles.value}>+994105554422</div>
            </div>
          </div>

          <div className={styles.paymentTitle}>
            Ödəniş metodunu seçin:
          </div>

          <div className={styles.paymentBox}>
            <div
              className={`${styles.option} ${
                payment === "cash" ? styles.active : ""
              }`}
              onClick={() => setPayment("cash")}
            >
              Qapıda nəğd ödəmə
              <input type="radio" checked={payment === "cash"} readOnly />
            </div>

            <div
              className={`${styles.option} ${
                payment === "card" ? styles.active : ""
              }`}
              onClick={() => setPayment("card")}
            >
              Qapıda kart ilə ödəmə
              <input type="radio" checked={payment === "card"} readOnly />
            </div>
          </div>

          <button className={styles.button}>Sifarişi tamamla</button>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.summaryTitle}>Xülasə</div>

          <div className={styles.item}>
            <span>3 x Bağ Pomidoru</span>
            <span>6 ₼</span>
          </div>

          <div className={styles.item}>
            <span>4 x Banan</span>
            <span>19.96 ₼</span>
          </div>

          <div className={styles.item}>
            <span>1 x Ananas</span>
            <span>4.2 ₼</span>
          </div>

          <div className={styles.item}>
            <span>1 x çiyələk</span>
            <span>3.55 ₼</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.item}>
            <span>Ümumi:</span>
            <span>33.71 ₼</span>
          </div>

          <div className={styles.item}>
            <span>Çatdırılma:</span>
            <span>Pulsuz</span>
          </div>

          <div className={`${styles.total} ${styles.final}`}>
            <span>Yekun məbləğ</span>
            <span>33.71 ₼</span>
          </div>
        </div>
      </div>
    </div>
  );
}