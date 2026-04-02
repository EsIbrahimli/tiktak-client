"use client";

import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Product Detail</h1>
      <p>ID: {id}</p>
    </div>
  );
}