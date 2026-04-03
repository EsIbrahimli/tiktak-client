import styles from "./404ErrorPage.module.css";
import Image from "next/image";
import Link from 'next/link';

export default function Error404Page() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/notfound.svg"
          alt="404 Error"
          width={600}
          height={450}
          className={styles.image}
        />
         </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>
            Səhifə tapılmadı, deyəsən bir problem baş verib!
          </p>
          <Link href="/">
            <button className={styles.button}>Geri qayıt</button>
          </Link>
        </div>
    </div>
  );
}
