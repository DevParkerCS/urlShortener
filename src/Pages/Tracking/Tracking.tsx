import { Bar } from "react-chartjs-2";
import { Nav } from "../../Components/Nav/Nav";
import styles from "./Tracking.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { shortenedUrlsType } from "../Home/Components/UrlInfo/UrlInfo";
import { DisplayClickCount } from "./Components/DisplayClickCount/DisplayClickCount";

export type UrlClickType = {
  clickedAt: Date;
  id: number;
  ipAddress: string;
  urlMapping: shortenedUrlsType;
};

export const Tracking = () => {
  const [urlData, setUrlData] = useState<UrlClickType[]>([]);
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  useEffect(() => {
    getLinkData();
  }, []);

  const getLinkData = async () => {
    setIsDataProcessed(false);
    const response = await axios.get("http://localhost:8080/tracking/2d03102f");
    const urls: UrlClickType[] = response.data;

    for (let i = 0; i < urls.length; i++) {
      // Change clickedAt from string to Date
      urls[i].clickedAt = new Date(urls[i].clickedAt);
    }

    setUrlData(urls);
    setIsDataProcessed(true);
  };

  return (
    <div>
      <Nav />
      <h2 className={styles.pageClicksTitle}>
        Total Page Clicks: {urlData.length}
      </h2>
      <DisplayClickCount urlData={urlData} />
    </div>
  );
};
