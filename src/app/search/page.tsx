// "use client";
"use client";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { axiosInstance } from "../../services/axiosInstance"; // düz import

interface Product {
  id: number;
  name: string;
  price: number;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    axiosInstance
      .get("/products", { params: { search: query } })
      .then((res) => {
        // data array olduğunu yoxlayırıq
        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else if (Array.isArray(res.data.products)) {
          setResults(res.data.products);
        } else {
          setResults([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Axtarış nəticələri</h1>
      {loading && <p>Yüklənir...</p>}
      {!loading && results.length === 0 && <p>Nəticə tapılmadı</p>}
      <ul>
        {(results || []).map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}₼
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;