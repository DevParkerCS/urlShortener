import styles from "./Nav.module.scss";

export const Nav = () => {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navTitleWrapper}>
        <h1 className={styles.navTitle}>SHRTUR</h1>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>Shorten</li>
        <li className={styles.navItem}>Tracking</li>
        <li className={styles.navItem}>Login</li>
      </ul>
    </div>
  );
};
