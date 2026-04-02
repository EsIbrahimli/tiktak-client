"use client";
import { usePathname } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";

import Link from "next/link";
import styles from "./Header.module.css";
import Search from "../Search/Search";



const Header = () => {
    const pathname = usePathname();
    const normalizedPath = pathname.toLowerCase();
    const isLanding = normalizedPath === "/" || normalizedPath.startsWith("/landingpage");

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <Link href="/" className={styles.brand}>
                        TIK TAK
                    </Link>

                    {!isLanding && (
                        <div className={styles.address}>
                            <IoLocationOutline size={18} />
                            <div>
                                <p className={styles.title}>Ünvan</p>
                                <p className={styles.subtitle}>Adres qeyd olunmayıb</p>
                            </div>
                        </div>
                    )}
                </div>

                {!isLanding && (
                    <div className={styles.centerSection}>
                        <Search />
                    </div>
                )}

                <div className={styles.rightSection}>
                    <nav className={styles.nav}>
                        <Link className={styles.link} href="/account">
                            <IoPersonOutline /> Hesabim
                        </Link>
                        <Link className={styles.link} href="/favorites">
                            <MdFavoriteBorder />
                            Siyahilarim
                        </Link>
                        <Link className={styles.link} href="/basket">
                            <SlBasket />
                            Sebetim
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;