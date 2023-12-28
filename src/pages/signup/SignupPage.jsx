import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singUpApi } from "../../API/authApi";
import { setUser } from "../../store/slices/userSlice";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [surname, setSurname] = useState("");
  const role = "user";
  const [error, setError] = useState(null);
  const [offButton, setOffButton] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorsForm, setErrorsForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateFormReg = () => {
    let isValid = true;
    const newErrors = { ...errorsForm };
    const passPattern = /^[^\s]+$/g;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
      newErrors.email = "Введите почту";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Введите корректную почту";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (password.trim() === "") {
      newErrors.password = "Введите пароль";
      isValid = false;
    } else if (!passPattern.test(password)) {
      newErrors.password = "Пароль не должен содержать пробелы";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Подтвердите пароль";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Пароли не совпадают";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrorsForm(newErrors);
    return isValid;
  };

  //сброс ошибок валидации
  useEffect(() => {
    setError(null);
  }, [email, password, confirmPassword, name, surname, city]);

  useEffect(() => {
    const newErrors = { ...errorsForm };
    newErrors.email = "";
    setErrorsForm(newErrors);
  }, [email]);

  useEffect(() => {
    const newErrors = { ...errorsForm };
    newErrors.password = "";
    setErrorsForm(newErrors);
  }, [password]);

  useEffect(() => {
    const newErrors = { ...errorsForm };
    newErrors.confirmPassword = "";
    setErrorsForm(newErrors);
  }, [confirmPassword]);

  const handleReg = async (event) => {
    if (validateFormReg()) {
      event.preventDefault();
      try {
        const response = await singUpApi(
          email,
          password,
          name,
          role,
          surname,
          city
        );
        dispatch(
          setUser({
            email: response.email,
            name: response.name,
            id: response.id,
            surname: response.surname,
            avatar: response.avatar,
            phone: response.phone,
            role: response.role,
            city: response.city,
          })
        );
        console.log(response);
        setOffButton(true);
        navigate("/");
        setName();
        setSurname();
        setEmail();
        setPassword();
        setCity();
        setConfirmPassword();
      } catch (error) {
        setError(error.message);
      } finally {
        setOffButton(false);
      }
    }
  };

  return (
    <div className={styles.containerSignup}>
      <div className={styles.modalBlock}>
        <form
          className={styles.modalFormLogin}
          id="formSignUp"
          action="#"
          onSubmit={handleReg}
        >
          <div className={styles.modalLogo}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          {error && <div className={styles.errorMain}>{error}</div>}
          <div className={styles.inputBlog}>
            <input
              className={`${styles.modalInput} ${styles.modalInputMarginNone}`}
              type="text"
              name="login"
              id="loginReg"
              placeholder="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {errorsForm.email && (
              <div className={styles.error}>{errorsForm.email}</div>
            )}
          </div>
          <div className={styles.inputBlog}>
            <input
              className={`${styles.modalInput} ${styles.modalInputMarginNone}`}
              type="password"
              name="password"
              id="passwordFirst"
              placeholder="Пароль"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {errorsForm.password && (
              <div className={styles.error}>{errorsForm.password}</div>
            )}
          </div>
          <div className={styles.inputBlog}>
            <input
              className={`${styles.modalInput} ${styles.modalInputMarginNone}`}
              type="password"
              name="password"
              id="passwordSecond"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            {errorsForm.confirmPassword && (
              <div className={styles.error}>{errorsForm.confirmPassword}</div>
            )}
          </div>
          <input
            className={styles.modalInput}
            type="text"
            name="first-name"
            id="firstName"
            placeholder="Имя (необязательно)"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className={styles.modalInput}
            type="text"
            name="last-name"
            id="lastName"
            placeholder="Фамилия (необязательно)"
            value={surname}
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />
          <input
            className={styles.modalInput}
            type="text"
            name="city"
            id="city"
            placeholder="Город (необязательно)"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <button
            className={styles.modalBtnSignupEnt}
            id="SignUpEnter"
            disabled={offButton}
            type="submit"
          >
            {offButton ? "Осуществляем регистрацию" : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
