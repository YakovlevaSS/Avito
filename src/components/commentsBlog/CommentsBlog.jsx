import styles from "./styles.module.css";
import { useGetCommentsQuery } from "../../store/RTKQuery/adsApi";

const getCommentsWordForm = (number) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return ["отзыв", "отзыва", "отзывов"][
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

export const CommentsBlog = ({ setIsShow, id }) => {
  const { data = []} = useGetCommentsQuery(id);

  const commentsCount = data?.length || 0;
  const commentsWordForm = getCommentsWordForm(commentsCount);

  return (
    <button
      className={styles.articleLink}
      onClick={() => {
        setIsShow(true);
      }}
    >
      {commentsCount} {commentsWordForm}
    </button>
  );
};
