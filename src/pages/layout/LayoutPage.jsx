import styles from './styles.module.css'
import { Outlet } from 'react-router'

export default function LayoutPage() {
return (
<div className={styles.wrapper}>
  <div className={styles.container}>
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        <button className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`} id="btnMainEnter">
          Вход в личный кабинет
        </button>
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
)
}