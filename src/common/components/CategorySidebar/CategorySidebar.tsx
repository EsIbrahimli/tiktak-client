"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CategorySidebar.module.css";
import type { Category } from "@/services/categoryApi";

interface CategorySidebarProps {
  categories: Category[];
  activeCategoryId?: number;
  breadcrumbLabel?: string;
}

export default function CategorySidebar({
  categories,
  activeCategoryId,
  breadcrumbLabel,
}: CategorySidebarProps) {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <p className={styles.breadcrumb}>
        <button className={styles.breadcrumbLink} onClick={() => router.push("/category")}>
          Ana Səhifə
        </button>
        {breadcrumbLabel && <>{" / "}{breadcrumbLabel}</>}
      </p>

      <h1 className={styles.title}>Kateqoriyalar</h1>

      <div className={styles.categoryNameWrapper}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className={`${styles.categoryName} ${activeCategoryId === cat.id ? styles.activeCategoryName : ""}`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/images/category.svg"
          alt="Category image"
          priority
          width={300}
          height={480}
        />
      </div>
    </div>
  );
}
