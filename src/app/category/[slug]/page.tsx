"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useCategoriesStore } from '@/common/store/categoryStore';
import { useProductsStore } from '@/common/store/productsStore';
import styles from '../categories.module.css';
import Loading from '@/common/components/Loading/Loading';


export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const selectedCategoryId = Number(slug);
  const router = useRouter();

  const {categories, selectedCategory, fetchCategoryById,fetchCategories, loading: catLoading } = useCategoriesStore();
  const { products, fetchProductsByCategory, loading: prodLoading } = useProductsStore();

useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


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
      <div className={styles.categoryDetailInfo}>
        <p className={styles.breadcrumb}>
          <button className={styles.breadcrumbLink} onClick={() => router.push('/category')}>
            Ana Səhifə
          </button>
          {' / '}{selectedCategory.name}
        </p>
        <h1 className={styles.categoryDetailTitle}>Kateqoriyalar</h1>
        <div className={styles.categoryNameWrapper}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className={`${styles.categoryName} ${Number(slug) === cat.id ? styles.activeCategoryName : ''}`}
          >
            {cat.name}
          </Link>
        ))}
        </div>
        <div className={styles.categoryImageWrapper}>
          <Image 
            src='/images/category.svg'
            alt={'Category image'}
            priority
            loading="eager"
            width={300}
            height={480}
          />
        </div>
      </div>

      <div className={styles.categoryCards}>
        {prodLoading ? (
          <Loading />
        ) : filteredProducts.length === 0 ? (
          <p className={styles.emptyState}>Bu kateqoriyada məhsul tapılmadı.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
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
              <button className={styles.addBtn}>Səbətə əlavə et</button>
            </div>
          ))
        )}
      </div>
    </div>

  );
}
