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

      console.error("Add product error:", err);
    }
  };

  return (
    <div className={styles.containerBg}>
      <div className={styles.modalBlock}>
        <div className={styles.modalContent}>
        <div className={styles.modalTitleBlog}>
            <svg className={styles.articleFillImgSvg}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="21"
              viewBox="0 0 12 21"
              fill="none"
              onClick={() => {
                setIsShow(false);
              }}
            >
              <path
                d="M11 1.5L2 10.5L11 19.5"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          <h3 className={styles.modalTitle}>Отзывы о товаре</h3>
          </div>
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
