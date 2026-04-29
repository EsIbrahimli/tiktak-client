"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { useAccountStore } from "@/common/store/accountStore";

import Link from "next/link";
import styles from "./Header.module.css";
import Search from "../Search/Search";



const Header = () => {
    const pathname = usePathname();
    const normalizedPath = pathname.toLowerCase();
    const isLanding = normalizedPath === "/" || normalizedPath.startsWith("/landingpage");
    const is404Page = normalizedPath === "/404error" || normalizedPath.startsWith("/404error/");
    const { account, fetchAccount } = useAccountStore();

    useEffect(() => {
        fetchAccount();
    }, [fetchAccount]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <Link href="/" className={styles.brand}>
                        TİK TAK
                    </Link>

                    {!isLanding && !is404Page && (
                        <div className={styles.address}>
                            <IoLocationOutline size={18} />
                            <div>
                                <p className={styles.title}>Ünvan</p>
                                <p className={styles.subtitle}>{account?.adress || "Ünvan qeyd olunmayıb"}</p>
                            </div>
                        </div>
                    )}
                </div>

                {!isLanding && !is404Page && (
                    <div className={styles.centerSection}>
                        <Search />
                    </div>
                )}

                <div className={styles.rightSection}>
                    <nav className={styles.nav}>
                        <Link className={styles.link} href="/account">
                            <IoPersonOutline /> <span className={styles.linkText}>Hesabim</span>
                        </Link>
                        <Link className={styles.link} href="/favorites">
                            <MdFavoriteBorder />
                            <span className={styles.linkText}>Siyahilarim</span>
                        </Link>
                        <Link className={styles.link} href="/basket">
                            <SlBasket />
                            <span className={styles.linkText}>Sebetim</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;