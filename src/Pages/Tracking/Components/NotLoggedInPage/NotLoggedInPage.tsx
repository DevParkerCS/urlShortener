import { useNavigate } from "react-router-dom";
import { Nav } from "../../../../Components/Nav/Nav";
import styles from "./NotLoggedInPage.module.scss";

export const NotLoggedInPage = () => {
  const nav = useNavigate();

  return (
    <div>
      <Nav />
      <div className={styles.contentWrapper}>
        <h1 className={styles.errorTitle}>
          Sorry! You must be logged in to access link analytics.
        </h1>
        <h2 className={styles.loginCTA} onClick={() => nav("/login")}>
          Click here to login or create a new account!
        </h2>
      </div>
    </div>
  );
};
