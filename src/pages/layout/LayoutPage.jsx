import styles from "./styles.module.css";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AddNewAt from "../../components/addNewAt/AddNewAt";

export default function LayoutPage() {
  const user = localStorage.getItem("email");
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.headerNav}>
            {!user ? (
              <button
                className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`}
                id="btnMainEnter"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Вход в личный кабинет
              </button>
            ) : (
              <>
                <button
                  className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`}
                  id="btnMainEnter"
                  onClick={() => {
                    setIsShow(true);
                  }}
                >
                  Разместить объявление
                </button>
                <button
                  className={`${styles.headerBtnMainEnter} ${styles.btnHov01}`}
                  id="btnMainEnter"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Личный кабинет
                </button>
              </>
            )}
          </nav>
        </header>
        <Outlet />
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerImg}>
              <NavLink to="/">
                <img src="/img/icon_01.png" alt="home" />
              </NavLink>
            </div>
            {user && (
              <>
                <div className={styles.footerImg}>
                  <NavLink
                    onClick={() => {
                      setIsShow(true);
                    }}
                  >
                    <img src="/img/icon_02.png" alt="add" />
                  </NavLink>
                </div>
                <div className={styles.footerImg}>
                  <NavLink to="/profile">
                    <img src="/img/icon_03.png" alt="personal" />
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </footer>
      </div>
      {isShow && <AddNewAt setIsShow={setIsShow} />}
    </div>
  );
}
