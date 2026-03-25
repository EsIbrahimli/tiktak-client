"use client";
import { useState } from "react";
import styles from "./landingPage.module.css";
import { useRouter } from "next/navigation";
const slides = [
  { id: 1, title: "Yaz kampaniyası", img: "https://tiktak-web.vercel.app/_next/image?url=https%3A%2F%2Fuploads.sarkhanrahimli.dev%2Fonlearn%2Fimages%2Fonlearn-file-2025_07_30_21_37_44-rsfr6p.webp&w=640&q=75" },
  { id: 2, title: "Moda", img: "https://source.unsplash.com/random/600x400?fashion" },
  { id: 3, title: "Ev", img: "https://source.unsplash.com/random/600x400?home" },
  { id: 4, title: "İdman", img: "https://source.unsplash.com/random/600x400?sport" },
];

export default function LandingPage() {
  const [page, setPage] = useState(0);
  const router = useRouter();

const next = () => {
  setPage((prev) => (prev + 1) % 2); // 4 kart / 2 = 2 page
};

const prev = () => {
  setPage((prev) => (prev - 1 + 2) % 2);
};
  const visibleSlides = slides.slice(page * 2, page * 2 + 2);

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.button} onClick={prev}>{"<"}</button>

      <div className={styles.slidesWrapper}>
        {visibleSlides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.img} alt={slide.title} className={styles.slideImg} />
            <h2>{slide.title}</h2>

            <button
  className={styles.buttonCard}
  onClick={() => {
    console.log("CLICKED"); // klik işləyir?
    router.push(`/category/${slide.id}`);
  }}
>
  Ətraflı
</button>
          </div>
        ))}
      </div>

      <button className={styles.button} onClick={next}>{">"}</button>
    </div>
  );
}