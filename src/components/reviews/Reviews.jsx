import styles from "./styles.module.css";

const Reviews= () => {
  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Отзывы о товаре</h3>
          <div className={styles.modalBtnClose}>
            <div className={styles.modalBtnCloseLine}></div>
          </div>
          <div className={styles.modalScroll}>
            <form className={`${styles.modalFormNewArt} ${styles.formNewArt}`} id="formNewArt" action="#">
              <div className={styles.formNewArtBlock}>
                <label htmlFor="text">Добавить отзыв</label>
                <textarea
                  className={styles.formNewArtArea}
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="5"
                  placeholder="Введите описание"
                ></textarea>
              </div>
              <button className={`${styles.formNewArtBtnPub} ${styles.btnHov02}`} id="btnPublish">
                Опубликовать
              </button>
            </form>

            <div className={`${styles.modalReviews} ${styles.reviews}`}>
              <div className={`${styles.reviewsReview} ${styles.review}`}>
                <div className={styles.reviewItem}>
                  <div className={styles.reviewLeft}>
                    <div className={styles.reviewImg}>
                      <img src="" alt="" />
                    </div>
                  </div>
                  <div className={styles.reviewRight}>
                    <p className={`${styles.reviewName} ${styles.fontT}`}>
                      Олег <span>14 августа</span>
                    </p>
                    <h5 className={`${styles.reviewTitle} ${styles.fontT}`}>Комментарий</h5>
                    <p className={`${styles.reviewText} ${styles.fontT}`}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
