import axios from "axios";
import { UrlClickType } from "../Pages/Tracking/Tracking";

export const processData = (
  timeFrame: string,
  startDate: Date,
  endDate: Date
) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const encodedTimeZone = encodeURIComponent(userTimeZone);
  switch (timeFrame) {
    case "yearly":
      return getYearlyData(startDate, endDate, encodedTimeZone);
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

const getYearlyData = async (
  startYear: Date,
  endYear: Date,
  encodedTimeZone: string
) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/range/7d8a5b5d/${startYear.toISOString()}/${endYear.toISOString()}?timeZone=${encodedTimeZone}`
  );
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getMonthlyData = async (encodedTimeZone: string) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/7d8a5b5d/${2025}?timeZone=${encodedTimeZone}`
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
    `http://localhost:8080/tracking/range/7d8a5b5d/${startDate.toISOString()}/${endDate.toISOString()}?timeZone=${encodedTimeZone}`
  );
  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getHourlyData = async (day: Date, encodedTimeZone: string) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/range/7d8a5b5d/${day.toISOString()}/${day.toISOString()}?timeZone=${encodedTimeZone}`
  );

  const urls: UrlClickType[] = response.data;

  assingnUrlsDate(urls);

  return urls;
};

const getLatestHour = async (encodedTimeZone: string) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/current/7d8a5b5d?timeZone=${encodedTimeZone}`
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
    `http://localhost:8080/tracking/range/7d8a5b5d/${startDate.toISOString()}/${endDate.toISOString()}?timeZone=${encodedTimeZone}`
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
