"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCategoriesStore } from "@/common/store/categoryStore";
import styles from "./categories.module.css";

export default function CategoriesPage() {
  const { categories, fetchCategories, loading } = useCategoriesStore();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <p>Yüklənir...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.card}
            onClick={() => router.push(`/category/${cat.slug}`)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={cat.img_url}
                alt={cat.name || "category"}
                width={90}
                height={90}
              />
            </div>

            <p className={styles.name}>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}