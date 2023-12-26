import styles from "./styles.module.css";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";

export default function LayoutPage() {
  const user = true;
  const navigate = useNavigate();
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.headerNav}>
            {user === false ? (
              <button
                className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`}
                id="btnMainEnter"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Вход в личный кабинет
              </button>
            ) : (
              <>
                <button
                  className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`}
                  id="btnMainEnter"
                >
                  Разместить объявление
                </button>
                <button
                  className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`}
                  id="btnMainEnter"
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Личный кабинет
                </button>
              </>
            )}
          </nav>
        </header>
        <Outlet />
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerImg}>
              <a href="" target="_self">
                <img src="img/icon_01.png" alt="home" />
              </a>
            </div>
            <div className={styles.footerImg}>
              <a href="" target="_self">
                <img src="img/icon_02.png" alt="home" />
              </a>
            </div>
            <div className={styles.footerImg}>
              <a href="" target="_self">
                <img src="img/icon_03.png" alt="home" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
