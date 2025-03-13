import styles from "./Home.module.scss";
import { Nav } from "../../Components/Nav/Nav";

import { UrlInfo } from "../../Components/UrlInfo/UrlInfo";

export const Home = () => {
  return (
    <div className={styles.contentWrapper}>
      <Nav />
      <UrlInfo />
    </div>
  );
};
