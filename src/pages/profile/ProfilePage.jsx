import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import CardItem from "../../components/card/Card";
import { useGetMeProductsQuery } from "../../store/RTKQuery/adsApi";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/user";
import UserSettings from "../../components/userSettings/UserSettings";

export default function ProfilePage() {
  const { data = [], isLoading } = useGetMeProductsQuery();
  const { name } = useSelector(userSelector);

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.mainCenterBlock}>
          <LogoBlog />
          {name ? (
            <h2 className={styles.mainH2}>Здравствуйте, {name}!</h2>
          ) : (
            <h2 className={styles.mainH2}>Здравствуйте!</h2>
          )}
          <div className={`${styles.mainProfile} ${styles.profile}`}>
            <UserSettings />
          </div>
          <h3 className={`${styles.mainTitle} ${styles.title}`}>Мои товары</h3>
        </div>
        {isLoading ? (
          <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
        ) : data.length === 0 ? (
          <p className={styles.mainText}>У вас пока нет ни одного объявления, вперед продавать!</p>
        ) : (
          <div className={styles.mainContent}>
            <div className={`${styles.contentCards} ${styles.cards}`}>
              <CardItem products={data} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
