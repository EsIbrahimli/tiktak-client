import styles from './myBasket.module.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from 'next/image';

const Basket = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.basketTitle}>Səbətim</h2>
            <div className={styles.basket}>
                <div className={styles.basketItems}>
                    <div className={styles.basketItem}>
                        <div className={styles.itemDetails}>
                            <div className={styles.itemImageWrapper}>
                                <Image src="/images/category.svg" alt="Product Image" width={40} height={40} className={styles.itemImage} />
                            </div>
                            <div className={styles.itemInfo}>
                                <h3 className={styles.itemName}>Məhsul Adı</h3>
                                <div className={styles.quantityControl}>
                                    <button className={styles.reduceBtn}>-</button>
                                    <span>1</span>
                                    <button className={styles.increaseBtn}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.itemActions}>
                            <RiDeleteBin6Line className={styles.deleteIcon} />
                            <h2 className={styles.producPrice}>100 Azn</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.basketTotal}>
                    <h2>Ümumi: <span></span></h2>
                    <h2>Çatdırılma: <span>Pulsuz</span></h2>
                    <h3>Yekun məbləğ: <span>₼ 100.00</span> </h3>
                    <button className={styles.checkoutButton}>Sifarişi tamamla</button>
                </div>
            </div>
        </div>
    );
}

export default Basket;