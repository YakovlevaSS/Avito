import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userSelector } from "../../store/selectors/user";
import { changeUser } from "../../API/userApi";
import { setUser, removeUser } from "../../store/slices/userSlice";

export default function UserSettings() {
  const { name, surname, phone, avatar, city } = useSelector(userSelector);

  const [nameInput, setNameInput] = useState(name || "");
  const [cityInput, setCityInput] = useState(city || "");
  const [surnameInput, setSurnameInput] = useState(surname || "");
  const [phoneInput, setPhoneInput] = useState(phone || "");
  const [activeButton, setActiveButton] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setNameInput(name);
    setCityInput(city);
    setSurnameInput(surname);
    setPhoneInput(phone);
  }, [name, city, surname, phone]);
  useEffect(() => {
    if (!nameInput && !cityInput && !surnameInput && !phoneInput) {
      setActiveButton(false);
    }
  }, [nameInput, cityInput, surnameInput, phoneInput]);

  const handleChangeUser = async (event) => {
    event.preventDefault();

    try {
      const responseUser = await changeUser(
        nameInput,
        surnameInput,
        cityInput,
        phoneInput
      );

      dispatch(
        setUser({
          email: responseUser.email,
          name: responseUser.name,
          id: responseUser.id,
          surname: responseUser.surname,
          avatar: responseUser.avatar,
          phone: responseUser.phone,
          role: responseUser.role,
          city: responseUser.city,
        })
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setActiveButton(false);
    }
  };

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
              {avatar && avatar !== "null" ? (
                <img src={`http://localhost:8090/${avatar}`} alt="ava" />
              ) : (
                ""
              )}
            </NavLink>
          </div>
          <a className={styles.settingsChangePhoto} href="" target="_self">
            Заменить
          </a>
        </div>
        <div className={styles.settingsRight}>
          <form
            className={styles.settingsForm}
            action="#"
            onSubmit={handleChangeUser}
          >
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
            {error && <div className={styles.error}>{error}</div>}
            <button
              className={`${styles.settingsBtn} ${styles.btnHov02}`}
              id="settings-btn"
              type="submit"
              disabled={!activeButton}
            >
              Сохранить
            </button>
            <button
              className={`${styles.settingsBtn} ${styles.btnHov02}`}
              id="settings-btn"
              onClick={() => {
                dispatch(removeUser());
                navigate("/");
              }}
            >
              Выйти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
