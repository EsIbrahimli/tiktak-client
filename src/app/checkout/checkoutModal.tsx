"use client";
import styles from "./checkoutModal.module.css";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
 
 

export default function ConfirmModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;
   const [timeLeft, setTimeLeft] = useState(60); 
  useEffect(() => {
  if (!open) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [open]);

  const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

const formattedTime = `${minutes}:${seconds
  .toString()
  .padStart(2, "0")}`;
 


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>⏰</div>

        <h2 className={styles.title}>Sifarişinizi təsdiqləyiniz</h2>
        <p className={styles.subtitle}>
  vaxtın bitməsinə {formattedTime} qaldı
</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>
            Təsdiqlə
          </button>

          <button className={styles.cancel} onClick={onClose}>
            İndi yox
          </button>
        </div>
      </div>
    </div>
  );
}