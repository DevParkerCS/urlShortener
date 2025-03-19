import { DataType } from "../Pages/Tracking/Components/DisplayClickCount/DisplayClickCount";
import { UrlClickType } from "../Pages/Tracking/Tracking";

export const renderData = (
  urls: UrlClickType[],
  graphData: DataType,
  timeFrame: string
) => {
  switch (timeFrame) {
    case "monthly":
      return setupMonthly(urls, graphData);
    case "hourly":
      return setupHourly(urls, graphData);
  }
};

const setupMonthly = (urls: UrlClickType[], graphData: DataType) => {
  let newData = { ...graphData };
  newData.datasets[0].data = Array(12).fill(0);
  newData.labels.length = 12;
  newData.labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < urls.length; i++) {
    const monthIndex = urls[i].clickedAt.getMonth();
    console.log(urls[i].clickedAt.getHours());
    const monthData = newData.datasets[0].data;
    monthData[monthIndex]++;
  }
  return newData;
};

const setupHourly = (urls: UrlClickType[], graphData: DataType) => {
  let newData = { ...graphData };
  newData.datasets[0].data = Array(12).fill(0);
  newData.labels = [
    "12 A.M.",
    "2 A.M.",
    "4 A.M.",
    "6 A.M.",
    "8 A.M.",
    "10 A.M.",
    "12 P.M.",
    "2 P.M.",
    "4 P.M.",
    "6 P.M.",
    "8 P.M.",
    "10 P.M.",
  ];

  for (let i = 0; i < urls.length; i++) {
    const hourIndex = Math.floor(urls[i].clickedAt.getHours() / 2);
    const hourData = newData.datasets[0].data;
    hourData[hourIndex]++;
  }

  return newData;
};
