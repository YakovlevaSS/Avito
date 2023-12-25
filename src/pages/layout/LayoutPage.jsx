import styles from './styles.module.css'


export default function LayoutPage() {
return (
<div className={styles.wrapper}>
  <div className={styles.container}>
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <button className={`${styles.header__btnMainEnter} ${styles.btnHov01}`} id="btnMainEnter">
          Вход в личный кабинет
        </button>
      </nav>
    </header>
  </div>
</div>
)
}