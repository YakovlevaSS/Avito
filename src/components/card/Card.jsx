import styles from "./styles.module.css";

export default function CardItem() {
  return (
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
  );
}
