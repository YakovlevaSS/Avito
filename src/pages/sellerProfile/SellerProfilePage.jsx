import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import CardItem from "../../components/card/Card";
export default function SellerProfilePage() {
  return (
    <main className={styles.main}>
      <div className={styles.mainCenterBlock}>
        <LogoBlog />
        <h2 className={styles.mainH2}>Профиль продавца</h2>
        <div className={`${styles.mainProfileSell} ${styles.profileSell}`}>
          <div className={styles.profileSellContent}>
            <div className={`${styles.profileSellSeller} ${styles.seller}`}>
              <div className={styles.sellerLeft}>
                <div className={styles.sellerImg}>
                  <a href="" target="_self">
                    <img src="#" alt="" />
                  </a>
                </div>
              </div>
              <div className={styles.sellerRight}>
                <h3 className={styles.sellerTitle}>Кирилл Матвеев</h3>
                <p className={styles.sellerCity}>Санкт-Петербург</p>
                <p className={styles.sellerInf}>
                  Продает товары с августа 2021
                </p>
                <div className={styles.sellerImgMobBlock}>
                  <div className={styles.sellerImgMob}>
                    <a href="" target="_self">
                      <img src="#" alt="" />
                    </a>
                  </div>
                </div>
                <button className={`${styles.sellerBtn} ${styles.btnHov02}`}>
                  Показать&nbsp;телефон
                  <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 className={styles.mainTitle}>Товары продавца</h3>
      </div>
      <div className={styles.mainContent}>
        <div className={`${styles.contentCards} ${styles.cards}`}>
          <CardItem />
        </div>
      </div>
    </main>
  );
}
