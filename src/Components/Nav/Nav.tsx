import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import { useUser } from "../../Context/UserContext";
import { handleLogout } from "../../Util/UserAuthentication";

export const Nav = () => {
  const nav = useNavigate();
  const user = useUser();

  const handleLogoutClick = async () => {
    await handleLogout();
    console.log(user.user);
    user.setUser(null);
    nav("/");
  };

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
        {user.user === null ? (
          <li className={styles.navItem} onClick={() => nav("/login")}>
            Login
          </li>
        ) : (
          <li className={styles.navItem} onClick={handleLogoutClick}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};
