import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useAddCommentMutation } from "../../store/RTKQuery/adsApi";
import ReviewsItem from "../reviewsItem/ReviewsItem";
const Reviews = ({ setIsShow, id }) => {
  const [textCom, setTextCom] = useState("");
  const [offButton, setOffButton] = useState(true);
  const [addComment, { isLoading, error }] = useAddCommentMutation();

  useEffect(() => {
    if (!textCom) {
      setOffButton(true);
    } else {
      setOffButton(false);
    }
  }, [textCom]);

  const handleSentCom = async (event) => {
    event.preventDefault();
    try {
      const response = await addComment({
        text: textCom,
        id,
      });
      console.log(response);
      setTextCom("");
    } catch (err) {
      // Handle errors if needed
      console.error("Add product error:", err);
    }
  };

  const handleClick = (event) => {
    const target = event.target;

    // Проверяем, находится ли кликнутый элемент внутри .modalBtnCloseLine::before
    if (target.classList.contains('modalBtnCloseLine') || target.parentElement.classList.contains('modalBtnCloseLine')) {
      // Ваша логика обработки клика на .modalBtnCloseLine::before
      console.log('Клик на .modalBtnCloseLine::before');
    }
  };
  
  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent} onClick={handleClick}>
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
              onSubmit={handleSentCom}
            >
              <div className={styles.formNewArtBlock}>
                <label className={styles.formLabel} htmlFor="text">
                  Добавить отзыв
                </label>
                {error && <div className={styles.error}>{error.message}</div>}
                <textarea
                  className={styles.formNewArtArea}
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="5"
                  placeholder="Введите описание"
                  value={textCom}
                  onChange={(event) => {
                    setTextCom(event.target.value);
                  }}
                ></textarea>
              </div>
              <button
                className={
                  offButton
                    ? `${styles.formNewArtBtnPub}`
                    : `${styles.formNewArtBtnPubActive} ${styles.btnHov02}`
                }
                id="btnPublish"
                disabled={offButton}
                type="submit"
              >
                {isLoading ? "Публикуем..." : "Опубликовать"}
              </button>
            </form>

            <div className={`${styles.modalReviews} ${styles.reviews}`}>
              <div className={`${styles.reviewsReview} ${styles.review}`}>
                <ReviewsItem id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
