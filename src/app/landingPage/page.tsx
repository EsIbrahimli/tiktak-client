"use client";
import { useState } from "react";
import styles from "./landingPage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import 'antd/dist/reset.css';
import { ShopOutlined, EnvironmentOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTelegramPlane, FaMusic, FaWhatsapp } from 'react-icons/fa';

const resolveImageSrc = (src: string) => {
  try {
    const parsed = new URL(src);
    if (parsed.pathname === '/_next/image') {
      const originalUrl = parsed.searchParams.get('url');
      if (originalUrl) {
        return decodeURIComponent(originalUrl);
      }
    }
  } catch {
    // If parsing fails, return the original src
  }

  return src;
};

const slides = [
  { id: 1, title: "Yaz kampaniyası", description: "Təzə mövsüm, təzə fürsətlər! Yazın enerjisini alış-verişə daşıyın! Sezonun ən çox satılan məhsullarında xüsusi endirimlər sizi gözləyir. Geyimdən ev əşyalarına qədər minlərlə məhsulda yaz ruhunu hiss edin!", img: "https://tiktak-web.vercel.app/_next/image?url=https%3A%2F%2Fuploads.sarkhanrahimli.dev%2Fonlearn%2Fimages%2Fonlearn-file-2025_07_30_21_37_44-rsfr6p.webp&w=640&q=75" },
  { id: 2, title: "Teknoloji Festivali", description: "Yeni texnologiyalar, yeni imkanlar! Teknolojinin ən son inkişafı ilə tanış olun!", img: "https://tiktak-web.vercel.app/_next/image?url=https%3A%2F%2Fuploads.sarkhanrahimli.dev%2Fonlearn%2Fimages%2Fonlearn-file-2025_07_30_21_39_10-wog9nb.webp&w=640&q=75" },
  { id: 3, title: "Yeni il kampaniyası", description: "Yeni ilə birlikdə yeni imkanlar! Yeni ilin ən yaxşı təklifləri sizi gözləyir!", img: "https://tiktak-web.vercel.app/_next/image?url=https%3A%2F%2Fuploads.sarkhanrahimli.dev%2Fonlearn%2Fimages%2Fonlearn-file-2025_07_30_21_38_34-tykmu9.webp&w=640&q=75" },
  { id: 4, title: "Moda Heftesi", description: "Moda və stil haqqında ən son xəbərlər! Yeni yaxınlar və trendlər sizi gözləyir!", img: "https://tiktak-web.vercel.app/_next/image?url=https%3A%2F%2Fuploads.sarkhanrahimli.dev%2Fonlearn%2Fimages%2Fonlearn-file-2025_07_30_21_37_25-d0znbo.webp&w=640&q=75" },
];

export default function LandingPage() {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const router = useRouter();

  const changePage = (newPage: number) => {
    setFading(true);
    setTimeout(() => {
      setPage(newPage);
      setFading(false);
    }, 400);
  };

  const next = () => changePage((page + 1) % 2);
  const prev = () => changePage((page - 1 + 2) % 2);

  const visibleSlides = slides.slice(page * 2, page * 2 + 2);

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <button className={styles.button} onClick={prev}>{"<"}</button>

        <div className={`${styles.slidesWrapper} ${fading ? styles.fading : ''}`}>
          {visibleSlides.map((slide) => (
            <div key={slide.id} className={styles.slide}>
              <Image src={resolveImageSrc(slide.img)} alt={slide.title} className={styles.slideImg} height={200} width={200} />
              <div className={styles.slideContent}>
                <h2 className={styles.slideTitle}>{slide.title}</h2>
                <p className={styles.slideDescription}>{slide.description}</p>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.buttonCard}
                  onClick={() => {
                    router.push(`/category`);
                  }}
                >
                  Ətraflı
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={next}>{">"}</button>
      </div>

      <h3 className={styles.title1}>Xüsusi təkliflər!</h3>
      <p className={styles.text}>TİKTAK-da hər gün üçün xüsusi təklifləri qaçırmayın!</p>
      <div className={styles.staticCardsContainer}>
        {slides.slice(0, 2).map((slide) => (
          <div
            key={slide.id}
            className={styles.staticCard}
            onClick={() => router.push(`/category`)}
          >
            <Image src={resolveImageSrc(slide.img)} alt={slide.title} className={styles.staticCardImg} height={200} width={200} />
            <div className={styles.staticCardOverlay}>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h4 className={styles.title1}>Bizim göstəricilər</h4>
      <p className={styles.text}>Biz yeni imkanlar axtarırıq və digərlərinin bilmədikləri yerlərə getməyə hazırıq.</p>
      <Row gutter={16} style={{ marginTop: '40px'}}>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Market sayı"
              value={137}
              styles={{ content: { color: '#3f8600', fontWeight: 'bold' } }}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Region"
              value={11}
              styles={{ content: { color: '#1890ff', fontWeight: 'bold' } }}
              prefix={<EnvironmentOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Məhsul sayı"
              value="50000+"
              styles={{ content: { color: '#fa8c16', fontWeight: 'bold' } }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic
              title="Əməkdaş sayı"
              value="5500+"
              styles={{ content: { color: '#cf1322', fontWeight: 'bold' } }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <h5 className={styles.title2}>TIK TAK</h5>
      <footer className={styles.footer}>
        <div className={styles.links}>
          <div className={styles.footerColumn}>
            <div>
            <h4>Şirkət</h4>
            <ul>
              <li>Xüsusi təkliflər</li>
              <li>Haqqımızda</li>
              <li>Kartlar</li>
              <li>İcarəyə verməyə yeriniz var?</li>
            </ul>
            </div>
          </div>
          <div>
            <h4>Digər</h4>
            <ul>
              <li>Xəbərlər</li>
              <li>Karyera</li>
              <li>Müştəri xidmətləri</li>
            </ul>
          </div>
          <div>
            <h4>Hüquq</h4>
            <ul>
              <li>İstifadə şərtləri</li>
              <li>İmtina</li>
              <li>Onlayn market</li>
              <li>Marketlərimiz</li>
              <li>Korporativ satış</li>
            </ul>
          </div>
          <div>
            <h4>Yeniliklərə abuna olun</h4>
            <div className={styles.subscribe}>
              <input type="email" placeholder="E-mail daxil edin" />
              <button>Göndər</button>
            </div>
          </div>
        </div>
        <div className={styles.socialInfo}>
          <span>© 2025 Azerbaijan Supermarket. Bütün hüquqlar qorunur</span>
          <span>Site by Grup II</span>
          <span>🌐 Azərbaycan</span>
          <div className={styles.social}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaMusic /></a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>
      </footer>
    </div>

  );
}
