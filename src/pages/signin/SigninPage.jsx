import styles from "./styles.module.css";
import { useNavigate } from "react-router";

const SigninPage = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.containerEnter}>
      <div className={styles.modalBlock}>
        <form className={styles.modalFormLogin} id="formLogIn" action="#">
          <div className={styles.modalLogo}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          <input
            className={`${styles.modalInput} ${styles.login}`}
            type="text"
            name="login"
            id="formLogin"
            placeholder="Email"
          />
          <input
            className={`${styles.modalInput} ${styles.password}`}
            type="password"
            name="password"
            id="formPassword"
            placeholder="Пароль"
          />
          <button className={styles.modalBtnEnter}>
            <a href="../index.html">Войти</a>
          </button>
          <button className={styles.modalBtnSignup} onClick={() => {navigate('/signup')}}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
