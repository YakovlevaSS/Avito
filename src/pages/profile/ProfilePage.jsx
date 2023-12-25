import styles from "./styles.module.css";

export default function ProfilePage() {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.mainCenterBlock}>
          <div className={`${styles.mainMenu} ${styles.menu}`}>
            <a className={styles.menuLogoLink} href="" target="_blank">
              <img className={styles.menuLogoImg} src="img/logo.png" alt="logo" />
            </a>
            <form className={styles.menuForm} action="#">
              <button className={`${styles.menuBtn} ${styles.btnHov02}`} id="btnGoBack">
                Вернуться на&nbsp;главную
              </button>
            </form>
          </div>
          <h2 className={styles.mainH2}>Здравствуйте, Антон!</h2>
          <div className={`${styles.mainProfile} ${styles.profile}`}>
            <div className={styles.profileContent}>
              <h3 className={`${styles.profileTitle} ${styles.title}`}>Настройки профиля</h3>
              <div className={`${styles.profileSettings} ${styles.settings}`}>
                <div className={styles.settingsLeft}>
                  <div className={styles.settingsImg}>
                    <a href="" target="_self">
                      <img src="#" alt="" />
                    </a>
                  </div>
                  <a className={styles.settingsChangePhoto} href="" target="_self">
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
                    <button className={`${styles.settingsBtn} ${styles.btnHov02}`} id="settings-btn">
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
            <div className={styles.cardsItem}>
              <div className={`${styles.cardsCard} ${styles.card}`}>
                <div className={styles.cardImage}>
                  <a href="" target="_blank">
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
            {/* Добавьте остальные элементы в соответствии с вашей разметкой */}
          </div>
        </div>
      </div>
    </main>
  );
};

