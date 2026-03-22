"use client";
import { IoPersonOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";

import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>
                    Tik Tak
                </Link>

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