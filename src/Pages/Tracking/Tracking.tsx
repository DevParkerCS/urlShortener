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
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { NotLoggedInPage } from "./Components/NotLoggedInPage/NotLoggedInPage";
import { DateSelector } from "./Components/DateSelector/DateSelector";

export type UrlClickType = {
  clickedAt: Date;
  id: number;
  ipAddress: string;
  urlMapping: shortenedUrlsType;
  region: string;
};

export const Tracking = () => {
  const [selectedUrl, setSelectedUrl] = useState<shortenedUrlsType | null>(
    null
  );
  const [urlData, setUrlData] = useState<UrlClickType[]>([]);
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [startDay, setStartDay] = useState<Date>(new Date());
  const [endDay, setEndDay] = useState<Date>(new Date());
  const [isDataProcessed, setIsDataProcessed] = useState(false);
  const user = useUser();

  useEffect(() => {
    console.log(startDay);
    getLinkData();
  }, [timeFrame, selectedUrl, startDay, endDay]);

  const getLinkData = async () => {
    if (selectedUrl != null) {
      try {
        setIsDataProcessed(false);
        const urls: UrlClickType[] = await processData(
          selectedUrl.shortUrl,
          timeFrame,
          startDay,
          endDay
        );

        setUrlData([...urls]);
        setIsDataProcessed(true);
      } catch {
        console.log("Error getting processed data");
      }
    }
  };

  if (user.user === null) {
    return <NotLoggedInPage />;
  }

  return (
    <div>
      <Nav />

      <UrlSelect setSelectedUrl={setSelectedUrl} selectedUrl={selectedUrl} />
      <div className={styles.urlTitleWrapper}>
        <h1 className={styles.urlTitle}>Shrtur.com/{selectedUrl?.shortUrl}</h1>
      </div>

      <h2 className={styles.pageClicksTitle}>
        Total Page Clicks: {selectedUrl?.totalClicks || 0}
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
