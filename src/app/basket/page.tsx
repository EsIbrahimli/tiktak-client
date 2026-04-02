


"use client";


import { useEffect } from "react";
import styles from "./basket.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { useBasketStore } from "@/common/store/basketStore";
import { useRouter } from "next/navigation";

const Basket = () => {
  const {
    items: rawItems,
    total_price: rawTotal,
    addItem,
    removeItem,
    removeAllOfItem,
    fetchBasket,
  } = useBasketStore();
  const items = rawItems ?? [];
  const total_price = rawTotal ?? 0;
  const router = useRouter();

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  return (
    <div className={styles.container}>
      <div className={styles.basketItems}>
        <div className={styles.basketHeader}>
          <h1>Səbətim</h1>
          <button>Səbəti Təmizlə</button>
        </div>
        {items.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
          items.map((item) => {
            const imageSrc = item.img_url || item.url || "/images/category.svg";
            const imageAlt = item.title || item.name || "Product image";
            return (
              <div key={item.product_id} className={styles.basketItem}>
                <div className={styles.itemDetails}>
                  <div className={styles.itemImageWrapper}>
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      width={137}
                      height={137}
                      className={styles.itemImage}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>
                      {item.name || item.title} {item.quantity} kg
                    </h3>
                    <h2 className={styles.producPrice}>
                      {Number(item.total_price ?? 0).toFixed(2)} ₼
                    </h2>
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.reduceBtn}
                      onClick={() => removeItem(item.product_id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={styles.increaseBtn}
                      onClick={() => addItem(item.product_id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className={styles.basketTotal}>
        <h2 className={styles.totalTitle}>Yekun məbləğ</h2>
        <h2>
          Ümumi: <span>{Number(total_price).toFixed(2)} ₼</span>
        </h2>
        <h2>
          Çatdırılma: <span>Pulsuz</span>
        </h2>
        <h3 className={styles.finalTotal}>
          Yekun məbləğ: <span>₼ {Number(total_price).toFixed(2)}</span>{" "}
        </h3>
        <button
          className={styles.checkoutButton}
          onClick={() => router.push("/checkout")}
        >
          Sifarişi tamamla
        </button>
      </div>
    </div>
  );
};

export default Basket;
