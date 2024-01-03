import styles from "./styles.module.css";
import { useGetCommentsQuery } from "../../store/RTKQuery/adsApi";
import { DateReview } from "../dateBlog/DataBlog";
const ReviewsItem = ({ id }) => {
  const { data = [], isLoading, isError, error } = useGetCommentsQuery(id);
  console.log(data);
  console.log(data[0].text);
  return (
    <>
      {data?.map((item) => {
        return (
          <div className={styles.reviewItem} key={item.id}>
            <div className={styles.reviewLeft}>
              <div className={styles.reviewImg}>
                <img
                  src={
                    item?.author.avatar
                      ? `http://localhost:8090/${item?.author.avatar}`
                      : "/img/no-foto.png"
                  }
                  alt="ava"
                />
              </div>
            </div>
            <div className={styles.reviewRight}>
              <p className={`${styles.reviewName} ${styles.fontT}`}>
                {item?.author?.name} <DateReview inputDate={item?.created_on} />
              </p>
              <h5 className={`${styles.reviewTitle} ${styles.fontT}`}>
                Комментарий
              </h5>
              <p className={`${styles.reviewText} ${styles.fontT}`}>
                {item?.text}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReviewsItem;
