"use client";
import { useEffect, useState } from "react";
import styles from "./landingPage.module.css";
import { useLandingPageStore } from "../../common/store/landingPageStore";
import  {getSlides, Slide}  from "../../services/landingPageApi";

export default function LandingPage() {
  const [index, setIndex] = useState(0);

  const slides = useLandingPageStore((state) => state.slides);
  const setSlides = useLandingPageStore((state) => state.setSlides);

  useEffect(() => {
    const fetchSlides = async () => {
    // 1️⃣ API-dən real data gətir
    const dataFromApi = await getSlides();

    // 2️⃣ API data-nı store formatına çevir
    const formatted = dataFromApi.map(d => ({
      title: d.name,
      img: d.img_url,
      description: d.description, // optional, istəsən button üçün istifadə edə bilərsən
    }));

    // 3️⃣ Store-a set et
    setSlides(formatted);
  };

  fetchSlides();
}, [setSlides]);
   

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // İki kart yan-yana göstərmək
  const visibleSlides = [
    slides[index],
    slides[(index + 1) % slides.length],
  ].filter(Boolean);

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.button} onClick={prev}>{"<"}</button>

      <div className={styles.slidesWrapper}>
        {visibleSlides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.img_url} alt={slide.name} className={styles.slideImg} />
            <h2>{slide.name}</h2>
            <p>{slide.description}</p>
            <button className={styles.buttonCard}>Ətraflı</button>
          </div>
        ))}
      </div>

      <button className={styles.button} onClick={next}>{">"}</button>
    </div>
  );
}