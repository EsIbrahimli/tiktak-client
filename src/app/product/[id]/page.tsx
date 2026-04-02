"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/services/axiosInstance";
import Image from "next/image";
import { useFavoriteStore } from "@/common/store/favoriteStore";
import { useBasketStore } from "@/common/store/basketStore";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);

  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const { addItem } = useBasketStore();

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Product error:", err);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>

      <Image
        src={product.img_url || "/images/category.svg"}
        alt={product.name}
        width={300}
        height={300}
      />

      <h2>{product.price} ₼</h2>

      <div onClick={() => toggleFavorite(product)}>
        {isFavorite(product.id) ? "❤️" : "🤍"}
      </div>

      <button onClick={() => addItem(product.id)}>
        Səbətə əlavə et
      </button>
    </div>
  );
}