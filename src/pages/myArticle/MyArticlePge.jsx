import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";

export default function MyArticlePage() {
  return (
    <main className={styles.main}>
      <LogoBlog />

      <div className={`${styles.mainArtic} ${styles.artic}`}>
        <div className={`${styles.articContent} ${styles.article}`}>
          <div className={styles.articleLeft}>
            <div className={styles.articleFillImg}>
              <div className={styles.articleImg}>
                <img src="" alt="" />
              </div>
              <div className={styles.articleImgBar}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className={styles.articleImgBarDiv}>
                    <img src="" alt="" />
                  </div>
                ))}
              </div>
              <div className={`${styles.articleImgBarMob} ${styles.imgBarMob}`}>
                <div
                  className={`${styles.imgBarMobCircle} ${styles.circleActive}`}
                ></div>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className={styles.imgBarMobCircle}></div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.articleRight}>
            <div className={styles.articleBlock}>
              <h3 className={`${styles.articleTitle} ${styles.title}`}>
                Ракетка для большого тенниса Triumph Pro STС Б/У
              </h3>
              <div className={styles.articleInfo}>
                <p className={styles.articleDate}>Сегодня в 10:45</p>
                <p className={styles.articleCity}>Санкт-Петербург</p>
                <a
                  className={styles.articleLink}
                  href="/"
                  target="_blank"
                  rel=""
                >
                  23 отзыва
                </a>
              </div>
              <p className={styles.articlePrice}>2 200 ₽</p>
              <div className={`${styles.articleBtnBlock} ${styles.btnBlock}`}>
                <button
                  className={`${styles.articleBtn} ${styles.btnRedact} ${styles.btnHov02}`}
                >
                  Редактировать
                </button>
                <button
                  className={`${styles.articleBtn} ${styles.btnRemove} ${styles.btnHov02}`}
                >
                  Снять с публикации
                </button>
              </div>
              <div className={`${styles.articleAuthor} ${styles.author}`}>
                <div className={styles.authorImg}>
                <img src="" alt="" />
                </div>
                <div className={styles.authorCont}>
                  <p className={styles.authorName}>Антон</p>
                  <p className={styles.authorAbout}>
                    Продает товары с мая 2022
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <h3 className={`${styles.mainTitle} ${styles.title}`}>
          Описание товара
        </h3>
        <div className={styles.mainContent}>
          <p className={styles.mainText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </main>
  );
}