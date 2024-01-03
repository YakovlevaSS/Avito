import styles from "./styles.module.css";
import { useGetCommentsQuery } from "../../store/RTKQuery/adsApi";
import ReviewsItem from "../reviewsItem/ReviewsItem";
const Reviews = ({ setIsShow, id }) => {
  const { data = [], isLoading, isError, error } = useGetCommentsQuery(id);

  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Отзывы о товаре</h3>
          <div className={styles.modalBtnClose}>
            <div
              className={styles.modalBtnCloseLine}
              onClick={() => {
                setIsShow(false);
              }}
            ></div>
          </div>
          <div className={styles.modalScroll}>
            <form
              className={`${styles.modalFormNewArt} ${styles.formNewArt}`}
              id="formNewArt"
              action="#"
            >
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
              <button
                className={`${styles.formNewArtBtnPub} ${styles.btnHov02}`}
                id="btnPublish"
              >
                Опубликовать
              </button>
            </form>

            <div className={`${styles.modalReviews} ${styles.reviews}`}>
              <div className={`${styles.reviewsReview} ${styles.review}`}>
                <ReviewsItem id={id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
