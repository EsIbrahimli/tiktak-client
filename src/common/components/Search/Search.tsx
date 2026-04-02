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

  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    let active = true;

    axiosInstance
      .get("/products", { params: { search: query.trim() } })
      .then((res) => {
        if (!active) {
          return;
        }

        if (Array.isArray(res.data)) {
          setResults(res.data);
        } else if (Array.isArray(res.data.products)) {
          setResults(res.data.products);
        } else {
          setResults([]);
        }
      })
      .catch(() => {
        if (active) {
          setResults([]);
        }
      });

    return () => {
      active = false;
    };
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
    }
  };

  const showDropdown = query.trim().length >= 2;

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.input}
        type="text"
        placeholder="Axtarış"
        value={query}
        onChange={handleChange}
      />

      {showDropdown && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>{item.name}</span>
              <span>{item.price}₼</span>
            </li>
          ))}
        </ul>
      )}

      {showDropdown && results.length === 0 && (
        <p className={styles.empty}>Nəticə tapılmadı</p>
      )}
    </div>
  );
};

export default Search;
