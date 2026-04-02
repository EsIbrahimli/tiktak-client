// common/components/ProductCard/ProductCard.tsx
"use client"; // Next.js 13+ üçün, interaktiv komponentlərdə

import React, { useState } from "react";
import styles from "./ProductCard.module.css"; // optional, sonra əlavə edə bilərsən

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);

  return (
    <div onClick={toggleDetails} className={styles.card}>
      <h3>{product.name}</h3>
      <p>Qiymət: {product.price} AZN</p>

      {showDetails && (
        <div className={styles.details}>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}