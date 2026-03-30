
"use client";
import { useState } from "react";
import styles from "./checkout.module.css";
import { useCartStore } from "../../common/store/checkoutStore";
import { createCheckoutOrder } from "../../services/checkoutApi";
import { toast } from "react-toastify";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [payment, setPayment] = useState("cash");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleOrder = async () => {
    if (!address || !phone) {
      alert("Ünvan və nömrə daxil edin");
      return;
    }

    if (items.length === 0) {
      alert("Səbət boşdur");
      return;
    }

    const orderData = {
      total: total.toFixed(2),
      deliveryFee: "0.00", 
      paymentMethod: payment.toUpperCase(),
      note,
      address,
      phone,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      setLoading(true);
      const data = await createCheckoutOrder(orderData);
      console.log("Sifariş tamamlandı:", data);
      clearCart();
      toast.success("Sifarişiniz uğurla tamamlandı!");
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      toast.error("Sifariş tamamlanmadı. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>Ana səhifə / Meyvələr</div>
      <div className={styles.title}>Sifarişin tamamlanması</div>

      <div className={styles.wrapper}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.info}>Əlaqə məlumatları</div>
          <div className={styles.form}>
            <div className={styles.infoRow}>
              <div className={styles.row}>
                <div className={styles.label}>Adınız</div>
                <div className={styles.value}>Admin</div>
              </div>

              <div className={styles.row}>
                <div className={styles.label}>Ünvanınız</div>
                <input
                  type="text"
                  className={styles.value}
                  placeholder="Ünvanınızı daxil edin"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <div className={styles.label}>Nömrəniz</div>
                <input
                  type="text"
                  className={styles.value}
                  placeholder="Nömrənizi daxil edin"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.label}>Əlavə qeyd</div>
              <textarea
                className={styles.textarea}
                placeholder="Əlavə qeydiniz varsa buraya daxil edin"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.paymentTitle}>Ödəniş metodunu seçin:</div>
          <div className={styles.paymentBox}>
            <div
              className={`${styles.option} ${payment === "cash" ? styles.active : ""
                }`}
              onClick={() => setPayment("cash")}
            >
              Qapıda nəğd ödəmə
              <input type="radio" checked={payment === "cash"} readOnly />
            </div>

            <div
              className={`${styles.option} ${payment === "card" ? styles.active : ""
                }`}
              onClick={() => setPayment("card")}
            >
              Qapıda kart ilə ödəmə
              <input type="radio" checked={payment === "card"} readOnly />
            </div>
          </div>

          <button onClick={() => setShowModal(true)}
            className={styles.button}
           
            disabled={loading}
          >
            {loading ? "Göndərilir..." : "Sifarişi tamamla"}
          </button>
        </div>
        <ConfirmModal
  open={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={async () => {
    setShowModal(false);
    await handleOrder(); // sənin POST funksiyan
  }}
/>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.summaryTitle}>Xülasə</div>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <span>
                {item.quantity} x {item.title}
              </span>
              <span>{(Number(item.price) * Number(item.quantity)).toFixed(2)} ₼</span>
            </div>
          ))}

          <div className={styles.divider}></div>

          <div className={styles.item}>
            <span>Ümumi:</span>
            <span>{total.toFixed(2)} ₼</span>
          </div>

          <div className={styles.item}>
            <span>Çatdırılma:</span>
            <span>Pulsuz</span>
          </div>

          <div className={`${styles.total} ${styles.final}`}>
            <span>Yekun məbləğ</span>
            <span>{total.toFixed(2)} ₼</span>
          </div>
        </div>
      </div>
    </div>
    
  );
}