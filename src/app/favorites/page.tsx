
"use client";

import { useFavoriteStore } from "@/common/store/favoriteStore";
import { useBasketStore } from "@/common/store/basketStore";
import MyBasket from "@/common/components/MyBasket/page";
import Image from "next/image";
import styles from "./favorites.module.css";
import { useEffect } from "react";


export default function Favorites() {
  const { favorites, fetchFavorites, toggleFavorite, isFavorite } = useFavoriteStore();
  const { addItem } = useBasketStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className={styles.container}>
      
      {/* SOL */}
      <div className={styles.left}>
        <h2>Sevimlilər</h2>

           <div className={styles.grid}>
          {favorites.length === 0 ? (
            <p className={styles.empytyfavorites}>Sevimlilər siyahısı boşdur</p>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className={styles.card}>
                <Image
                  src={item.img_url || "/images/category.svg"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className={styles.imageWrapper}
                />
                <p className={styles.productName}>{item.title}</p>
                <span className={styles.productPrice}>
                  {item.price} ₼
                </span>

                <div className={styles.cardButtons}>
                  <button
                    className={styles.addButton}
                    onClick={() => addItem(item.id)}
                  >
                    Səbətə əlavə et
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SAĞ */}
      <div className={styles.right}>
        <MyBasket />
      </div>
    </div>
  );
}