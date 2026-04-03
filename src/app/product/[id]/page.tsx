"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/services/axiosInstance";
import Image from "next/image";
import { useFavoriteStore } from "@/common/store/favoriteStore";
import { useBasketStore } from "@/common/store/basketStore";
import { useCategoriesStore } from "@/common/store/categoryStore";
import MyBasket from "@/common/components/MyBasket/page";
import CategorySidebar from "@/common/components/CategorySidebar/CategorySidebar";
import Loading from "@/common/components/Loading/Loading";
import type { Product } from "@/services/productsApi";
import styles from "../productDetail.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

const normalizeProduct = (raw: unknown): Product | null => {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const record = raw as Record<string, unknown>;
  const resolved =
    (record.data as Record<string, unknown> | undefined) ??
    record;

  const id = Number(resolved.id ?? 0);
  if (!id) {
    return null;
  }

  return {
    id,
    title: (resolved.title as string | undefined) ?? (resolved.name as string | undefined),
    name: (resolved.name as string | undefined) ?? (resolved.title as string | undefined),
    description: (resolved.description as string | undefined) ?? "",
    price: Number(resolved.price ?? 0),
    img_url: (resolved.img_url as string | undefined) ?? "/images/category.svg",
    unit: resolved.unit as string | undefined,
    category_id: resolved.category_id as number | undefined,
    category: resolved.category as Product["category"],
  };
};

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const { items, addItem, removeItem, fetchBasket } = useBasketStore();
  const { categories, fetchCategories } = useCategoriesStore();

  const basketQuantity = useMemo(() => {
    if (!product) {
      return 0;
    }

    const item = (items ?? []).find((i) => i.product_id === product.id);
    return item?.quantity ?? 0;
  }, [items, product]);

  useEffect(() => {
    fetchBasket();
    fetchCategories();
  }, [fetchBasket, fetchCategories]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    axiosInstance
      .get(`/products/${id}`, { signal: controller.signal })
      .then((res) => {
        setProduct(normalizeProduct(res.data));
        setLoading(false);
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          console.error("Product error:", err);
          setProduct(null);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <p className={styles.empty}>Məhsul tapılmadı.</p>;
  }

  const productName = product.title || product.name || "Məhsul";
  const selectedCategoryId = product.category_id ?? product.category?.id;
  const productDescription =
    product.description || "Təzə və keyfiyyətli məhsul gündəlik istifadəniz üçün idealdır.";

  return (
    <div className={styles.page}>
      <CategorySidebar
        categories={categories}
        activeCategoryId={selectedCategoryId}
        breadcrumbLabel={product.category?.name}
      />

      <div className={styles.mainCard}>
        <button
          className={styles.backButton}
          onClick={() => router.push(selectedCategoryId ? `/category/${selectedCategoryId}` : "/category")}
        >
          <MdArrowBackIos/> Geri qayıt
        </button>

        <button
          className={styles.favoriteButton}
          onClick={() =>
            toggleFavorite({
              id: product.id,
              title: productName,
              price: product.price,
              img_url: product.img_url,
            })
          }
        >
          {isFavorite(product.id) ? <FaHeart className={styles.redHeart}/> : <FaRegHeart />}
        </button>

        <div className={styles.productLayout}>
          <div className={styles.imageWrap}>
            <Image
              src={product.img_url || "/images/category.svg"}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <h2 className={styles.productName}>{productName}</h2>
            <p className={styles.description}>{productDescription}</p>
            <p className={styles.price}>
              {product.price} ₼{product.unit ? ` / ${product.unit}` : ""}
            </p>

            {basketQuantity > 0 ? (
              <div className={styles.quantityControl}>
                <button className={styles.reduceBtn} onClick={() => removeItem(product.id)}>-</button>
                <span className={styles.quantityValue}>{basketQuantity} kq</span>
                <button className={styles.increaseBtn} onClick={() => addItem(product.id)}>+</button>
              </div>
            ) : (
              <button className={styles.addButton} onClick={() => addItem(product.id)}>
                Səbətə əlavə et
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <MyBasket />
      </div>
    </div>
  );
}