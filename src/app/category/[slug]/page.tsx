"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCategoriesStore } from "@/common/store/categoryStore";

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const { selectedCategory, fetchCategoryBySlug, loading } =
    useCategoriesStore();

  useEffect(() => {
    if (slug) {
      fetchCategoryBySlug(slug as string);
    }
  }, [slug, fetchCategoryBySlug]);

  if (loading) return <p>Yüklənir...</p>;

  if (!selectedCategory) return <p>Kateqoriya tapılmadı</p>;



  return (
    <div style={{ padding: "20px" }}>
      <h1>{selectedCategory.name}</h1>

      <Image
        src={selectedCategory.img_url}
        alt={selectedCategory.name}
        width={200}
        height={200}
      />

      <p>{selectedCategory.description}</p>
    </div>

  );
}