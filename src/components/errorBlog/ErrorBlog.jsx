import React from "react";
import styles from "./styles.module.css";

const ErrorBlog = ({ errorMessage }) => (
  <div className={styles.errorContainer}>
    <h1 className={styles.errorHeading}>Что-то пошло не так</h1>
    <p className={styles.errorMessage}>
      {errorMessage ||
        "Упс! Произошла ошибка при загрузке данных. Пожалуйста, повторите попытку позже."}
    </p>
  </div>
);

export default ErrorBlog;
