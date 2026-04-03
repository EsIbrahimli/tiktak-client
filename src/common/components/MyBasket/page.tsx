'use client';

import { useEffect } from 'react';
import styles from './MyBasket.module.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from 'next/image';
import { useBasketStore } from '@/common/store/basketStore';
import { useRouter } from 'next/navigation';

const MyBasket = () => {
    const { items: rawItems, total_price: rawTotal, addItem, removeItem, removeAllOfItem, fetchBasket } = useBasketStore();
    const items = rawItems ?? [];
    const total_price = rawTotal ?? 0;
    const router = useRouter();

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + Number(item.total_price || 0), 0);
    };

    useEffect(() => {
        fetchBasket();
    }, [fetchBasket]);

    return (
        <div className={styles.container}>
            <h2 className={styles.basketTitle}>Səbətim</h2>
            <div className={styles.basket}>
                <div className={styles.basketItems}>
                    {items.length === 0 ? (
                        <p className={styles.emptyBasket}>Səbət boşdur</p>
                    ) : (
                        items.map((item) => {
                            const imageSrc = item.img_url || item.url || '/images/category.svg';
                            const imageAlt = item.title || item.name || 'Product image';
                            return (
                            <div key={item.product_id} className={styles.basketItem}>
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemImageWrapper}>
                                        <Image src={imageSrc} alt={imageAlt} width={40} height={40} className={styles.itemImage} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>{item.name || item.title} {item.quantity} kg</h3>
                                        <div className={styles.quantityControl}>
                                            <button className={styles.reduceBtn} onClick={() => removeItem(item.product_id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className={styles.increaseBtn} onClick={() => addItem(item.product_id)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.itemActions}>
                                    <RiDeleteBin6Line className={styles.deleteIcon} onClick={() => removeAllOfItem(item.product_id)} />
                                    <h2 className={styles.producPrice}>{Number(item.total_price ?? 0).toFixed(2)} ₼</h2>
                                </div>
                            </div>
                            );
                        })
                    )}
                </div>
                <div className={styles.basketTotal}>
                    <h2>Ümumi: <span>{Number(calculateTotal()).toFixed(2)} ₼</span></h2>
                    <h2>Çatdırılma: <span>Pulsuz</span></h2>
                    <h3>Yekun məbləğ: <span>₼ {Number(calculateTotal()).toFixed(2)}</span> </h3>
                    <button className={styles.checkoutButton} onClick={() => router.push('/checkout')}>Sifarişi tamamla</button>
                </div>
            </div>
        </div>
    );
}

export default MyBasket;