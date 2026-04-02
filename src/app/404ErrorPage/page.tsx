"use client"; 

import Image from "next/image";
import styles from "./404ErrorPage.module.css";
import errorImg from "@/assets/error404.svg";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>

        <div className={styles.imageWrapper}>
          <Image src={errorImg} alt="404" />
        </div>

        <p className={styles.text}>
          Səhifə tapılmayıbsa, problem yaranıb!
        </p>

        <button
          className={styles.button}
          onClick={() => router.push("/")}
        >
          Qayıt
        </button>
      </div>
    </div>
  );
}