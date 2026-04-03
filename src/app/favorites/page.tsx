
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
  }, []);

  return (
    <div className={styles.container}>
      
      {/* SOL */}
      <div className={styles.left}>
        <h2>Sevimlilər</h2>

           <div className={styles.grid}>
          {favorites.length === 0 ? (
            <p>Sevimlilər siyahısı boşdur</p>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className={styles.card}>
                <Image
                  src={item.img_url || "/images/category.svg"}
                  alt={item.title}
                  width={150}
                  height={150}
                  className={styles.imageWrapper}
                />
                <p className={styles.productName}>{item.title}</p>
                <span className={styles.productPrice}>
                  {item.price} ₼
                </span>

                <div className={styles.cardButtons}>
                  <button
                    className={styles.addButton}
                    onClick={() => addItem(item)}
                  >
                    Səbətə əlavə et
                  </button>

                  <button
                    className={styles.favoriteButton}
                    onClick={() => toggleFavorite(item)}
                  >
                    {isFavorite(item.id) ? "❤️" : "🤍"}
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