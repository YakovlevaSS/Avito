import styles from "./styles.module.css";
import CardItem from "../../components/card/Card";

export default function MainPage() {
  
  return (
    <main className={styles.main}>
      <div className={`${styles.mainSearch} ${styles.search}`}>
        <a className={styles.searchLogoLink} href="#" target="_blank">
          <img className={styles.searchLogoImg} src="img/logo.png" alt="logo" />
        </a>
        <a className={styles.searchLogoMobLink} href="#" target="_blank">
          <img
            className={styles.searchLogoMobImg}
            src="img/logo-mob.png"
            alt="logo"
          />
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
          <button className={`${styles.searchBtn} ${styles.btnHov02}`}>
            Найти
          </button>
        </form>
      </div>
      <div className={styles.mainContainer}>
        <h2 className={styles.mainH2}>Объявления</h2>
        <div className={styles.mainContent}>
          <div className={`${styles.contentCards} ${styles.cards}`}>
            <CardItem />
          </div>
        </div>
      </div>
    </main>
  );
}
