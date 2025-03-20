import axios from "axios";
import { UrlClickType } from "../Pages/Tracking/Tracking";

export const processData = (
  timeFrame: string,
  startDate: Date,
  endDate: Date
) => {
  switch (timeFrame) {
    case "yearly":

    case "monthly":
      return getMonthlyData();
    case "weekly":

    case "daily":
      return getDailyData(startDate, endDate);
    case "hourly":
      return getHourlyData(startDate);
    case "recent":
      return getLatestHour();
  }
};

const getMonthlyData = async () => {
  const response = await axios.get("http://localhost:8080/tracking/7d8a5b5d");
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getHourlyData = async (day: Date) => {
  console.log(day);
  const response = await axios.get(
    `http://localhost:8080/tracking/hourly/7d8a5b5d/${day.toISOString()}`
  );

  const urls: UrlClickType[] = response.data;
  assingnUrlsDate(urls);

  return urls;
};

const getLatestHour = async () => {
  const response = await axios.get(
    `http://localhost:8080/tracking/current/7d8a5b5d`
  );
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getDailyData = async (startDate: Date, endDate: Date) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/daily/7d8a5b5d/${startDate.toISOString()}/${startDate.toISOString()}`
  );
  const urls: UrlClickType[] = response.data;
  assingnUrlsDate(urls);

  return urls;
};

const assingnUrlsDate = (urls: UrlClickType[]) => {
  for (let i = 0; i < urls.length; i++) {
    // Change clickedAt from string to Date
    urls[i].clickedAt = new Date(urls[i].clickedAt);
  }
};
