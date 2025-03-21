import { ChartData } from "chart.js";
import { DataType } from "../Pages/Tracking/Components/DisplayClickCount/DisplayClickCount";
import { UrlClickType } from "../Pages/Tracking/Tracking";
import { PieData } from "../Pages/Tracking/Components/DisplayRegionData/DisplayRegionData";

export const renderRegionData = (urls: UrlClickType[], graphData: PieData) => {
  const newData = { ...graphData };
  newData.labels = [];
  newData.datasets[0].data = [];
  const regionData = new Map<string, number>();

  for (let i = 0; i < urls.length; i++) {
    const curCount = regionData.get(urls[i].region);
    regionData.set(urls[i].region, curCount ? curCount + 1 : 1);
  }

  regionData.forEach((val, key) => {
    newData.labels?.push(key);
    newData.datasets[0].data.push(val);
  });

  return newData;
};
