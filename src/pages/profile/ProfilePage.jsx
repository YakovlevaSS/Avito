import styles from "./styles.module.css";
import LogoBlog from "../../components/logoBlog/LogoBlog";
import CardItem from "../../components/card/Card";
import { useGetMeProductsQuery } from "../../store/RTKQuery/adsApi";

export default function ProfilePage() {
  const { data = [], isLoading } = useGetMeProductsQuery();

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.mainCenterBlock}>
          <LogoBlog />
          <h2 className={styles.mainH2}>Здравствуйте, Антон!</h2>
          <div className={`${styles.mainProfile} ${styles.profile}`}>
            <div className={styles.profileContent}>
              <h3 className={`${styles.profileTitle} ${styles.title}`}>
                Настройки профиля
              </h3>
              <div className={`${styles.profileSettings} ${styles.settings}`}>
                <div className={styles.settingsLeft}>
                  <div className={styles.settingsImg}>
                    <a href="" target="_self">
                      <img src="#" alt="" />
                    </a>
                  </div>
                  <a
                    className={styles.settingsChangePhoto}
                    href=""
                    target="_self"
                  >
                    Заменить
                  </a>
                </div>
                <div className={styles.settingsRight}>
                  <form className={styles.settingsForm} action="#">
                    <div className={styles.settingsDiv}>
                      <label htmlFor="fname">Имя</label>
                      <input
                        className={styles.settingsFName}
                        id="settings-fname"
                        name="fname"
                        type="text"
                        defaultValue="Ан"
                        placeholder=""
                      />
                    </div>
                    <div className={styles.settingsDiv}>
                      <label htmlFor="lname">Фамилия</label>
                      <input
                        className={styles.settingsLName}
                        id="settings-lname"
                        name="lname"
                        type="text"
                        defaultValue="Городецкий"
                        placeholder=""
                      />
                    </div>
                    <div className={styles.settingsDiv}>
                      <label htmlFor="city">Город</label>
                      <input
                        className={styles.settingsCity}
                        id="settings-city"
                        name="city"
                        type="text"
                        defaultValue="Санкт-Петербург"
                        placeholder=""
                      />
                    </div>
                    <div className={styles.settingsDiv}>
                      <label htmlFor="phone">Телефон</label>
                      <input
                        className={styles.settingsPhone}
                        id="settings-phone"
                        name="phone"
                        type="tel"
                        defaultValue={89161234567}
                        placeholder={+79161234567}
                      />
                    </div>
                    <button
                      className={`${styles.settingsBtn} ${styles.btnHov02}`}
                      id="settings-btn"
                    >
                      Сохранить
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <h3 className={`${styles.mainTitle} ${styles.title}`}>Мои товары</h3>
        </div>
        <div className={styles.mainContent}>
          <div className={`${styles.contentCards} ${styles.cards}`}>
            <CardItem />
          </div>
        </div>
      </div>
    </main>
  );
}
