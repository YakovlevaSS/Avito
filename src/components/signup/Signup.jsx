import styles from "./styles.module.css";

const Signup = () => {
  return (
    <div className={styles.containerSignup}>
      <div className={styles.modalBlock}>
        <form className={styles.modalFormLogin} id="formSignUp" action="#">
          <div className={styles.modalLogo}>
            <img src="../img/logo_modal.png" alt="logo" />
          </div>
          <input
            className={styles.modalInput}
            type="text"
            name="login"
            id="loginReg"
            placeholder="email"
          />
          <input
            className={styles.modalInput}
            type="password"
            name="password"
            id="passwordFirst"
            placeholder="Пароль"
          />
          <input
            className={styles.modalInput}
            type="password"
            name="password"
            id="passwordSecond"
            placeholder="Повторите пароль"
          />
          <input
            className={styles.modalInput}
            type="text"
            name="first-name"
            id="firstName"
            placeholder="Имя (необязательно)"
          />
          <input
            className={styles.modalInput}
            type="text"
            name="last-name"
            id="lastName"
            placeholder="Фамилия (необязательно)"
          />
          <input
            className={styles.modalInput}
            type="text"
            name="city"
            id="city"
            placeholder="Город (необязательно)"
          />
          <button className={styles.modalBtnSignupEnt} id="SignUpEnter">
            <a href="../index.html">Зарегистрироваться</a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
