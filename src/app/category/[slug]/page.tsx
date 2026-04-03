"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useCategoriesStore } from '@/common/store/categoryStore';
import { useProductsStore } from '@/common/store/productsStore';
import { useBasketStore } from '@/common/store/basketStore';
import MyBasket from '@/common/components/MyBasket/page';
import CategorySidebar from '@/common/components/CategorySidebar/CategorySidebar';
import styles from '../categories.module.css';
import Loading from '@/common/components/Loading/Loading';
import { useFavoriteStore } from '@/common/store/favoriteStore';


export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const selectedCategoryId = Number(slug);
  const router = useRouter();

  const { categories, selectedCategory, fetchCategoryById, fetchCategories, loading: catLoading } = useCategoriesStore();
  const { products, fetchProductsByCategory, loading: prodLoading } = useProductsStore();
  const { items: basketItems, addItem, removeItem, fetchBasket } = useBasketStore();
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  const getBasketQuantity = (productId: number) => {
    const item = (basketItems ?? []).find((i) => i.product_id === productId);
    return item ? item.quantity : 0;
  };

  useEffect(() => {
    fetchCategories();
    fetchBasket();
  }, [fetchCategories, fetchBasket]);


  useEffect(() => {
    if (slug) {
      fetchCategoryById(selectedCategoryId);
      fetchProductsByCategory(selectedCategoryId);
    }
  }, [slug, selectedCategoryId, fetchCategoryById, fetchProductsByCategory]);

  const filteredProducts = products.filter((product) => {
    if (product.category_id != null) {
      return product.category_id === selectedCategoryId;
    }

    if (product.category?.id != null) {
      return product.category.id === selectedCategoryId;
    }

    return true;
  });

  if (catLoading || !selectedCategory) return <Loading />;



  return (
    <div className={styles.categoryDetail}>
      <CategorySidebar
        categories={categories}
        activeCategoryId={selectedCategoryId}
        breadcrumbLabel={selectedCategory.name}
      />

      <div className={styles.categoryCards}>
        {prodLoading ? (
          <Loading />
        ) : filteredProducts.length === 0 ? (
          <p className={styles.emptyState}>Bu kateqoriyada məhsul tapılmadı.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard} onClick={() => router.push(`/product/${product.id}`)}>
              <div
                className={styles.heart}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite({
                    id: product.id,
                    title: product.title || product.name || "Məhsul",
                    price: product.price,
                    img_url: product.img_url,
                  });
                }}
              >
                {isFavorite(product.id) ? "❤️" : "🤍"}
              </div>
              <div className={styles.productImageWrapper}>
                <Image className={styles.productImage}
                  src={product.img_url}
                  alt={product.title || product.name || 'Product image'}
                  style={{ objectFit: 'cover' }}
                  width={200}
                  height={200}
                />
              </div>
              <p className={styles.productName}>{product.title || product.name}</p>
              <p className={styles.productPrice}>
                {product.price} ₼{product.unit ? ` / ${product.unit}` : ''}
              </p>
              {getBasketQuantity(product.id) > 0 ? (
                <div className={styles.quantityControl}>
                  <button
                    className={styles.reduceBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(product.id);
                    }}
                  >-</button>
                  <span className={styles.quantityDisplay}>{getBasketQuantity(product.id)}kg</span>
                  <button
                    className={styles.increaseBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product.id);
                    }}
                  >+1kg</button>
                </div>
              ) : (
                <button
                  className={styles.addBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(product.id);
                  }}
                >
                  Səbətə əlavə et
                </button>
              )}
            </div>
          ))
        )}
      </div>
      
      <MyBasket />
    </div>
  );
}
