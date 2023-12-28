import styles from "./styles.module.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { singInApi } from "../../API/authApi";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [offButton, setOffButton] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [errorsForm, setErrorsForm] = useState({
    email: "",
    password: "",
  });

  const validateFormLog = () => {
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

    setErrorsForm(newErrors);
    return isValid;
  };

  //сброс ошибок валидации
  useEffect(() => {
    setError(null);
  }, [email, password]);

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

  const handleLog = async (event) => {
    event.preventDefault();
    if (validateFormLog()) {
      try {
        const response = await singInApi(email, password);
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
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <div className={styles.containerEnter}>
      <div className={styles.modalBlock}>
        <form className={styles.modalFormLogin} id="formLogIn" action="#" onSubmit={handleLog}>
          <div className={styles.modalLogo}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          {error && <div className={styles.errorMain}>{error}</div>}
          <div className={styles.inputBlog}>
            <input
              className={`${styles.modalInput} ${styles.login}`}
              type="text"
              name="login"
              id="formLogin"
              placeholder="Email"
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
              className={`${styles.modalInput} ${styles.password}`}
              type="password"
              name="password"
              id="formPassword"
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
          <button
            className={styles.modalBtnEnter}
            disabled={offButton}
            type="submit"
          >
            {offButton ? "Осуществляем вход" : "Войти"}
          </button>
          <button
            className={styles.modalBtnSignup}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
