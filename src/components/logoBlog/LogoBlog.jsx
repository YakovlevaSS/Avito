import styles from "./styles.module.css";
import { useNavigate } from "react-router";

export default function LogoBlog() {
  const navigate = useNavigate()
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
          onClick={() =>{navigate('/')}}
        >
          Вернуться на главную
        </button>
      </form>
    </div>
  </div>
  );
}
