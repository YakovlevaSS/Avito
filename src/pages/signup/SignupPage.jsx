import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singUpApi } from "../../API/authApi";

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
      newErrors.password = "Подтвердите пароль";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Пароли не совпадают";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrorsForm(newErrors);
console.log(errorsForm)
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

  const handleReg = async () => {
    if (validateFormReg) {
      try {
        const response = await singUpApi(
          email,
          password,
          name,
          role,
          surname,
          city
        );
        // dispatch(
        //   setUser({
        //     email: response.email,
        //     id: response.uid,
        //     token: response.accessToken,
        //     password: password,
        //   })
        // );
        console.log(response);
        setOffButton(true);
        navigate("/");
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
        <form className={styles.modalFormLogin} id="formSignUp" action="#">
          <div className={styles.modalLogo}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <input
            className={styles.modalInput}
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
          <input
            className={styles.modalInput}
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
          <input
            className={styles.modalInput}
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
            onClick={handleReg}>
            {offButton ? "Осуществляем регистрацию" : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
