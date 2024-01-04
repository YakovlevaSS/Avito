import styles from './styles.module.css';

const LoadingBlog = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner}></div>
    <span className={styles.loadingText}>Загрузка...</span>
  </div>
);

export default LoadingBlog;