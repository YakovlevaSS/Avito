import styles from "./styles.module.css";

export default function LogoBlog() {
  return (
    <div className={styles.mainContainer}>
    <div className={` ${styles.mainMenu}`}>
      <a className={styles.menuLogoLink} href="/" target="_blank">
        <img className={styles.menuLogoImg} src="img/logo.png" alt="logo" />
      </a>
      <form className={styles.menuForm} action="#">
        <button
          className={`${styles.menuBtnSearch} ${styles.btnHov02}`}
          id="btnGoBack"
        >
          Вернуться на главную
        </button>
      </form>
    </div>
  </div>
  );
}
