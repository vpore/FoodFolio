import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.main}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
