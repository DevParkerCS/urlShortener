import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";

export const Nav = () => {
  const nav = useNavigate();

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navTitleWrapper}>
        <h1 className={styles.navTitle} onClick={() => nav("/")}>
          SHRTUR
        </h1>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem} onClick={() => nav("/")}>
          Shorten
        </li>
        <li className={styles.navItem} onClick={() => nav("/Tracking")}>
          Tracking
        </li>
        <li className={styles.navItem} onClick={() => nav("/")}>
          Login
        </li>
      </ul>
    </div>
  );
};
