import styles from "./styles.module.css";

export default function SellerProfilePage() {
  return (
<main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.mainCenterBlock}>
          <div className={`${styles.mainMenu} ${styles.menu}`}>
            <a className={styles.menuLogoLink} href="" target="_blank">
              <img className={styles.menuLogoImg} src="img/logo.png" alt="logo" />
            </a>
            <form className={styles.menuForm} action="#">
              <button className={`${styles.menuBtn} ${styles.btnHov02}`} id="btnGoBack">
                Вернуться на&nbsp;главную
              </button>
            </form>
          </div>
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
                  <p className={styles.sellerInf}>Продает товары с августа 2021</p>
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
            <div className={styles.cardsItem}>
              <div className={`${styles.cardsCard} ${styles.card}`}>
                <div className={styles.cardImage}>
                  <a href="" target="_blank">
                    <img src="#" alt="picture" />
                  </a>
                </div>
                <div className={styles.cardContent}>
                  <a href="" target="_blank">
                    <h3 className={styles.cardTitle}>
                      Ракетка для большого тенниса Triumph Pro ST
                    </h3>
                  </a>
                  <p className={styles.cardPrice}>2&nbsp;200&nbsp;₽</p>
                  <p className={styles.cardPlace}>Санкт Петербург</p>
                  <p className={styles.cardDate}>Сегодня в&nbsp;10:45</p>
                </div>
              </div>
            </div>
            {/* Добавьте остальные карточки сюда */}
          </div>
        </div>
      </div>
    </main>
  );
};