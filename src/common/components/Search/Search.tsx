"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "../../../services/axiosInstance";
import styles from "./Search.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }
     const controller = new AbortController();

    const delay = setTimeout(() => {
      setLoading(true);
    

      axiosInstance
        .get("/products/search", { params: { query : query.trim() },signal: controller.signal })
        .then((res) => {
          console.log("SEARCH RESPONSE:", res.data);
          const data =Array.isArray(res.data?.data)
            ? res.data.data
            : [];
            

          setResults(data);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 400);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  const showDropdown = isFocused && query.trim().length >= 3;
 

  return (
    <>
      {isFocused && (
        <div
          className={styles.overlay}
          onClick={() => setIsFocused(false)}
        />
      )}

      <div
        className={`${styles.searchBox} ${
          isFocused ? styles.searchBoxFocused : ""
        }`}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Axtarış"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        />

        {showDropdown && loading && <p>Yüklənir...</p>}

        {showDropdown && !loading && results.length > 0 && (
          <ul className={styles.results}>
            {results.map((item) => (
              <li key={item.id} className={styles.item}>
                <span>{item.name}</span>
                <span>{item.price}₼</span>
              </li>
            ))}
          </ul>
        )}

        {showDropdown && !loading && results.length === 0 && (
          <p className={styles.empty}>Nəticə tapılmadı</p>
        )}
      </div>
    </>
  );
};

export default Search;