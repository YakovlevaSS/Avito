import styles from './styles.module.css'


export default function Page() {
<main className={styles.main}>
  <div className={`${styles.mainSearch} ${styles.search}`}>
    <a className={styles.searchLogoLink} href="#" target="_blank">
      <img className={styles.searchLogoImg} src="img/logo.png" alt="logo" />
    </a>
    <a className={styles.searchLogoMobLink} href="#" target="_blank">
      <img className={styles.searchLogoMobImg} src="img/logo-mob.png" alt="logo" />
    </a>
    <form className={styles.searchForm} action="#">
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск по объявлениям"
        name="search"
      />
      <input
        className={styles.searchTextMob}
        type="search"
        placeholder="Поиск"
        name="search-mob"
      />
      <button className={`${styles.searchBtn} ${styles.btnHov02}`}>Найти</button>
    </form>
  </div>
  <div className={styles.mainContainer}>
    <h2 className={styles.mainH2}>Объявления</h2>
    <div className={styles.mainContent}>
      <div className={`${styles.contentCards} ${styles.cards}`}>
        <div className={styles.cardsItem}>
          <div className={`${styles.cardsCard} ${styles.card}`}>
            <div className={styles.cardImage}>
              <a href="#" target="_blank">
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
        <div className={styles.cardsItem}>
          <div className={styles.cardsCard}>
            <div className={styles.cardImage}>
              <a href="#" target="_blank">
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
      </div>
    </div>
  </div>
</main>

}