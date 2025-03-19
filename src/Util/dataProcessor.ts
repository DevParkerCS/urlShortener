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

    case "hourly":
      return getHourlyData(startDate);
    case "minute":
  }
};

const getMonthlyData = async () => {
  const response = await axios.get("http://localhost:8080/tracking/9ca625d3");
  const urls: UrlClickType[] = response.data;

  for (let i = 0; i < urls.length; i++) {
    // Change clickedAt from string to Date
    urls[i].clickedAt = new Date(urls[i].clickedAt);
  }

  return urls;
};

const getHourlyData = async (day: Date) => {
  const response = await axios.get(
    `http://localhost:8080/tracking/hourly/9ca625d3/${day.toISOString()}`
  );

  const urls: UrlClickType[] = response.data;

  for (let i = 0; i < urls.length; i++) {
    // Change clickedAt from string to Date
    urls[i].clickedAt = new Date(urls[i].clickedAt);
  }

  return urls;
};
