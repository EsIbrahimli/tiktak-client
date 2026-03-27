import styles from './Basket.module.css'


const Basket = () => {
  return (
    <div className={styles.basket}>      
        <h2 className={styles.basketTitle}>Səbət</h2>
        <div className={styles.basketItems}>    
            <div className={styles.basketItem}>
                <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>Məhsul Adı</h3>
                    <p className={styles.itemPrice}>₼ 100.00</p>
                </div>
                <button className={styles.removeButton}>Sil</button>
            </div>            
        </div>
        <div className={styles.basketTotal}>
            <h3>Cəmi: ₼ 100.00</h3>
            <button className={styles.checkoutButton}>Sifarişi tamamla</button>
        </div>
    </div>
  );
}

export default Basket;