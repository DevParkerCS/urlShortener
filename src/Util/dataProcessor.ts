import axios from "axios";
import { UrlClickType } from "../Pages/Tracking/Tracking";

let URL = "";

export const processData = (
  url: string,
  timeFrame: string,
  startDate: Date,
  endDate: Date
) => {
  URL = url;
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const encodedTimeZone = encodeURIComponent(userTimeZone);
  switch (timeFrame) {
    case "monthly":
      return getMonthlyData(encodedTimeZone);
    case "weekly":
      return getWeeklyData(startDate, endDate, encodedTimeZone);
    case "daily":
      return getDailyData(startDate, endDate, encodedTimeZone);
    case "hourly":
      return getHourlyData(startDate, encodedTimeZone);
    case "recent":
      return getLatestHour(encodedTimeZone);
    default:
      return getMonthlyData(encodedTimeZone);
  }
};

const getMonthlyData = async (encodedTimeZone: string) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/${URL}/${2025}?timeZone=${encodedTimeZone}`
  );
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getWeeklyData = async (
  startDate: Date,
  endDate: Date,
  encodedTimeZone: string
) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/range/${URL}/${startDate.toISOString()}/${endDate.toISOString()}?timeZone=${encodedTimeZone}`
  );
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getHourlyData = async (day: Date, encodedTimeZone: string) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/range/${URL}/${day.toISOString()}/${day.toISOString()}?timeZone=${encodedTimeZone}`
  );

  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getLatestHour = async (encodedTimeZone: string) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/current/${URL}?timeZone=${encodedTimeZone}`
  );
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getDailyData = async (
  startDate: Date,
  endDate: Date,
  encodedTimeZone: string
) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/range/${URL}/${startDate.toISOString()}/${endDate.toISOString()}?timeZone=${encodedTimeZone}`
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
