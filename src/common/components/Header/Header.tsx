"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

import Link from "next/link";
import styles from "./Header.module.css";



const Header = () => {
     const pathname = usePathname();
     console.log(pathname);
     
      const router = useRouter();


   const [searchQuery, setSearchQuery] = useState("");
    const [isMounted, setIsMounted] = useState(false);

  
    useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLanding = isMounted && (pathname === "/" || pathname.startsWith("/landingpage"));
  
  // Sadə input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // İstəsən buradan API çağırışı və ya filter funksiyası çağıra bilərsən
    console.log("Axtarış sorğusu:", e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return; // boş inputu yoxla
    // İstifadəçini /search səhifəsinə yönləndir
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    // Burada istədiyin səhifəyə yönləndir və ya nəticələri göstər
    console.log("Axtarış submit olundu:", searchQuery);
  };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>
                    Tik Tak
                </Link>
                 {/* ❗ Landing deyilsə göstər */}
        {!isLanding && (
          <>
            {/* Ünvan */}
            <div className={styles.address}>
              <IoLocationOutline size={18} />
              <div>
                <p className={styles.title}>Ünvan</p>
                <p className={styles.subtitle}>Adres qeyd olunmayıb</p>
              </div>
            </div>

            {/* Search */}
            <div className={styles.search}>
                 <form onSubmit={handleSearchSubmit}>
              <input type="text" placeholder="Axtarış" value={searchQuery} onChange={ (e) => setSearchQuery(e.target.value)} />
              </form>
            </div>
          </>
        )}

                <nav className={styles.nav}>
                    <Link className={styles.link} href="/account">
                        <IoPersonOutline/> Hesabim
                    </Link>
                    <Link className={styles.link} href="/favorites">
                        <MdFavoriteBorder/>
                        Siyahilarim
                    </Link>
                    <Link className={styles.link} href="/basket">
                        <SlBasket/>
                        Sebetim
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;