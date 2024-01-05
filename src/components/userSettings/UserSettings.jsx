import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { userSelector } from "../../store/selectors/user";
import { setUser, removeUser } from "../../store/slices/userSlice";
import {
  useChangeUserMutation,
  useSetAvatarMutation,
} from "../../store/RTKQuery/adsApi";

export default function UserSettings() {
  const { name, surname, phone, avatar, city } = useSelector(userSelector);
  const [changeUser, { isLoading: isLoadingChangeUser }] =
    useChangeUserMutation();
  const [setAvatar, { isLoading: isLoadingAvatar }] = useSetAvatarMutation();
  const [nameInput, setNameInput] = useState(name || "");
  const [cityInput, setCityInput] = useState(city || "");
  const [surnameInput, setSurnameInput] = useState(surname || "");
  const [phoneInput, setPhoneInput] = useState(phone || "");
  const [activeButton, setActiveButton] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState(false);
  const [errorChangeUser, setErrorChangeUser] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filePicker = useRef(null);

  useEffect(() => {
    setNameInput(name);
    setCityInput(city);
    setSurnameInput(surname);
    setPhoneInput(phone);
  }, [name, city, surname, phone]);

  const handleChangeUser = async (event) => {
    event.preventDefault();
    try {
      const responseUser = await changeUser({
        nameInput,
        surnameInput,
        cityInput,
        phoneInput,
      });
      console.log(responseUser);
      dispatch(
        setUser({
          email: responseUser.data.email,
          name: responseUser.data.name,
          id: responseUser.data.id,
          surname: responseUser.data.surname,
          avatar: responseUser.data.avatar,
          phone: responseUser.data.phone,
          role: responseUser.data.role,
          city: responseUser.data.city,
        })
      );
    } catch (error) {
      setErrorChangeUser(error.message);
    }
  };
  //avatar
  const handleSetAvatar = async (file) => {
    try {
      const responseUser = await setAvatar(file);
      console.log(responseUser);

      dispatch(
        setUser({
          email: responseUser.data.email,
          name: responseUser.data.name,
          id: responseUser.data.id,
          surname: responseUser.data.surname,
          avatar: responseUser.data.avatar,
          phone: responseUser.data.phone,
          role: responseUser.data.role,
          city: responseUser.data.city,
        })
      );
    } catch (error) {
      setErrorAvatar(error.message);
    }
  };

  const handleUploadFile = async () => {
    filePicker.current.click();
  };

  const handleImgAdd = (event) => {
    handleSetAvatar(event.target.files[0]);
  };

  //сброс ошибок валидации
  useEffect(() => {
    setErrorChangeUser(null);
  }, [nameInput, surnameInput, cityInput, phoneInput]);

  useEffect(() => {
    setErrorAvatar(null);
  }, [filePicker]);

  return (
    <div className={styles.profileContent}>
      <h3 className={`${styles.profileTitle} ${styles.title}`}>
        Настройки профиля
      </h3>
      <div className={`${styles.profileSettings} ${styles.settings}`}>
        <div className={styles.settingsLeft}>
          <div className={styles.settingsImg}>
            {/* <NavLink to="/profile"> */}
            {avatar && avatar !== "null" ? (
              <img src={`http://localhost:8090/${avatar}`} alt="ava" />
            ) : (
              ""
            )}
            {/* </NavLink> */}
            <input
              className={styles.hidden}
              type="file"
              ref={filePicker}
              onChange={handleImgAdd}
              accept="image/*, .png, .jpg, .gif, .web, .jpeg"
            ></input>
          </div>
          <div
            className={styles.settingsChangePhoto}
            onClick={handleUploadFile}
          >
            {isLoadingAvatar ? "Сохраняю изменения.." : "Заменить"}
          </div>
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
            {errorAvatar && <div className={styles.error}>{errorAvatar}</div>}
            {errorChangeUser && (
              <div className={styles.error}>{errorChangeUser}</div>
            )}
            <button
              className={`${styles.settingsBtn} ${styles.btnHov02}`}
              id="settings-btn"
              type="submit"
              disabled={!activeButton}
            >
              {isLoadingChangeUser ? "Сохраняю изменения.." : "Сохранить"}
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
