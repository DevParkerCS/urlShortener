import { Nav } from "../../Components/Nav/Nav";
import styles from "./Tracking.module.scss";
import { useEffect, useState } from "react";
import { shortenedUrlsType } from "../Home/Components/UrlInfo/UrlInfo";
import { DisplayClickCount } from "./Components/DisplayClickCount/DisplayClickCount";
import { processData } from "../../Util/dataProcessor";
import { DisplayRegionData } from "./Components/DisplayRegionData/DisplayRegionData";
import { DataButtons } from "./Components/DataButtons/DataButtons";
import axios from "axios";
import { UrlSelect } from "./Components/UrlSelection/UrlSelect";

export type UrlClickType = {
  clickedAt: Date;
  id: number;
  ipAddress: string;
  urlMapping: shortenedUrlsType;
  region: string;
};

export const Tracking = () => {
  const [urlData, setUrlData] = useState<UrlClickType[]>([]);
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [startDay, setStartDay] = useState<Date>(new Date());
  const [endDay, setEndDay] = useState<Date>(() => {
    const date = new Date(startDay);
    date.setDate(date.getDate() + 7 * 4 * 3);
    return date;
  });
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  useEffect(() => {
    getLinkData();
  }, [timeFrame]);

  const getLinkData = async () => {
    try {
      setIsDataProcessed(false);
      const urls: UrlClickType[] = await processData(
        timeFrame,
        startDay,
        endDay
      );

      setUrlData([...urls]);
      setIsDataProcessed(true);
    } catch {
      console.log("Error getting processed data");
    }
  };

  return (
    <div>
      <Nav />

      <UrlSelect />

      <h2 className={styles.pageClicksTitle}>
        Total Page Clicks: {urlData[0]?.urlMapping?.totalClicks || 0}
      </h2>

      <div className={styles.dataDisplayWrapper}>
        <div className={styles.dataWrapper}>
          <div className={styles.dataBtnsWrapper}>
            <DataButtons setTimeFrame={setTimeFrame} />
            <DateSelector
              setStartDay={setStartDay}
              setEndDay={setEndDay}
              timeFrame={timeFrame}
            />
          </div>
          <div className={styles.chartsWrapper}>
            <div className={styles.chartRow}>
              <div className={styles.chartWrapper}>
                <DisplayClickCount
                  urlData={urlData}
                  timeFrame={timeFrame}
                  startDay={startDay}
                  endDay={endDay}
                />
              </div>
              <div className={styles.chartWrapper}>
                <DisplayRegionData urls={urlData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type DateSelectorProps = {
  setStartDay: React.Dispatch<React.SetStateAction<Date>>;
  setEndDay: React.Dispatch<React.SetStateAction<Date>>;
  timeFrame: string;
};

const DateSelector = ({
  setStartDay,
  setEndDay,
  timeFrame,
}: DateSelectorProps) => {
  switch (timeFrame) {
    case "yearly":
      return <div></div>;
    case "monthly":
      return <div></div>;
    case "weekly":
      return <div></div>;
    case "daily":
      return <div></div>;
    case "hourly":
      return <div></div>;
    case "recent":
      return <div></div>;
    default:
      return <div></div>;
  }
};
