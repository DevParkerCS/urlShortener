import { Nav } from "../../Components/Nav/Nav";
import styles from "./Tracking.module.scss";
import { useEffect, useState } from "react";
import { shortenedUrlsType } from "../Home/Components/UrlInfo/UrlInfo";
import { DisplayClickCount } from "./Components/DisplayClickCount/DisplayClickCount";
import { processData } from "../../Util/dataProcessor";
import { DisplayRegionData } from "./Components/DisplayRegionData/DisplayRegionData";

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
    date.setDate(date.getDate() + 7);
    return date;
  });
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  useEffect(() => {
    getLinkData();
  }, [timeFrame]);

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

      <div className={styles.dataDisplayWrapper}>
        <div className={styles.dataWrapper}>
          <DataButtons setTimeFrame={setTimeFrame} />
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

type DataButtonsProps = {
  setTimeFrame: React.Dispatch<React.SetStateAction<string>>;
};

const DataButtons = ({ setTimeFrame }: DataButtonsProps) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        setTimeFrame("monthly");
        break;
      case 1:
        setTimeFrame("weekly");
        break;
      case 2:
        setTimeFrame("daily");
        break;
      case 3:
        setTimeFrame("hourly");
        break;
      case 4:
        setTimeFrame("recent");
        break;
    }
    setActiveBtn(index);
  };

  return (
    <div className={styles.dataBtnsWrapper}>
      <button
        className={`${styles.dataBtn} ${activeBtn === 0 ? styles.active : ""}`}
        onClick={() => handleClick(0)}
      >
        Monthly
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 1 ? styles.active : ""}`}
        onClick={() => handleClick(1)}
      >
        Weekly
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 2 ? styles.active : ""}`}
        onClick={() => handleClick(2)}
      >
        Daily
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 3 ? styles.active : ""}`}
        onClick={() => handleClick(3)}
      >
        Hourly
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 4 ? styles.active : ""}`}
        onClick={() => handleClick(4)}
      >
        Last Hour
      </button>
    </div>
  );
};
