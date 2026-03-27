"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCategoriesStore } from "@/common/store/categoryStore";
import styles from "./categories.module.css";
import Loading from "@/common/components/Loading/Loading";

export default function CategoriesPage() {
  const { categories, fetchCategories, loading } = useCategoriesStore();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <Loading />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <Image
          className={styles.imgCategory}
          src="/icons/login.svg"
          alt="Logo"
          width={800}
          height={500}
        />
        <h1 className={styles.imgTitle}>ONLİNE SİFARİŞ ET</h1>
        <p className={styles.imgDesc}><span>15</span> DƏQİQƏYƏ QAPINDA</p>
      </div>
      <div className={styles.cards}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.card}
            onClick={() => router.push(`/category/${cat.id}`)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={cat.img_url}
                alt={cat.name || 'Category image'}
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