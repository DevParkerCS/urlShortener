import { Nav } from "../../Components/Nav/Nav";
import styles from "./Tracking.module.scss";
import { useEffect, useState } from "react";
import { shortenedUrlsType } from "../Home/Components/UrlInfo/UrlInfo";
import { DisplayClickCount } from "./Components/DisplayClickCount/DisplayClickCount";
import { processData } from "../../Util/dataProcessor";

export type UrlClickType = {
  clickedAt: Date;
  id: number;
  ipAddress: string;
  urlMapping: shortenedUrlsType;
};

export const Tracking = () => {
  const [urlData, setUrlData] = useState<UrlClickType[]>([]);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [startDay, setStartDay] = useState<Date>(new Date());
  const [endDay, setEndDay] = useState<Date>(new Date());
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  useEffect(() => {
    getLinkData();
  }, []);

  const getLinkData = async () => {
    setIsDataProcessed(false);
    const urls: UrlClickType[] | undefined = await processData(
      timeFrame,
      startDay,
      endDay
    );

    setUrlData(urls || []);
    setIsDataProcessed(true);
  };

  return (
    <div>
      <Nav />
      <h2 className={styles.pageClicksTitle}>
        Total Page Clicks: {urlData[0]?.urlMapping?.totalClicks || 0}
      </h2>
      <DisplayClickCount
        urlData={urlData}
        timeFrame={timeFrame}
        startDay={startDay}
        endDay={endDay}
      />
    </div>
  );
};
