import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userSelector } from "../../store/selectors/user";

export default function UserSettings() {
  const { name, surname, phone, avatar, city } = useSelector(userSelector);

  const [nameInput, setNameInput] = useState(name);
  const [cityInput, setCityInput] = useState(city);
  const [surnameInput, setSurnameInput] = useState(surname);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [activeButton, setActiveButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!nameInput && !cityInput && !surnameInput && !phoneInput) {
      setActiveButton(false);
    }
  }, [nameInput, cityInput, surnameInput, phoneInput]);

  console.log(avatar);
  return (
    <div className={styles.profileContent}>
      <h3 className={`${styles.profileTitle} ${styles.title}`}>
        Настройки профиля
      </h3>
      <div className={`${styles.profileSettings} ${styles.settings}`}>
        <div className={styles.settingsLeft}>
          <div className={styles.settingsImg}>
            <NavLink to="/profile">
              <img
                src={
                  avatar && avatar !== "null"
                    ? `http://localhost:8090/${avatar}`
                    : "/img/no-foto.png"
                }
                alt="ava"
              />
            </NavLink>
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
                value={nameInput}
                placeholder="введите имя"
                onChange={(event) => {
                    setNameInput(event.target.value);
                    setActiveButton(true);
                  }}
              />
            </div>
            <div className={styles.settingsDiv}>
              <label htmlFor="lname">Фамилия</label>
              <input
                className={styles.settingsLName}
                id="settings-lname"
                name="lname"
                type="text"
                value={surnameInput}
                placeholder="введите фамилию"
                onChange={(event) => {
                    setSurnameInput(event.target.value);
                    setActiveButton(true);
                  }}
              />
            </div>
            <div className={styles.settingsDiv}>
              <label htmlFor="city">Город</label>
              <input
                className={styles.settingsCity}
                id="settings-city"
                name="city"
                type="text"
                value={cityInput}
                placeholder="введите город"
                onChange={(event) => {
                  setCityInput(event.target.value);
                  setActiveButton(true);
                }}
              />
            </div>
            <div className={styles.settingsDiv}>
              <label htmlFor="phone">Телефон</label>
              <input
                className={styles.settingsPhone}
                id="settings-phone"
                name="phone"
                type="tel"
                value={phoneInput !== "null" ? phoneInput : ""}
                placeholder="введите телефон"
                onChange={(event) => {
                  setPhoneInput(event.target.value);
                  setActiveButton(true);
                }}
              />
            </div>
            <button
              className={`${styles.settingsBtn} ${styles.btnHov02}`}
              id="settings-btn"
            >
              Сохранить
            </button>
            <button
              className={`${styles.settingsBtn} ${styles.btnHov02}`}
              id="settings-btn"
            >
              Выйти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
