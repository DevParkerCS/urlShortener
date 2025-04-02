import styles from "./DisplayRegionData.module.scss";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Colors,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { UrlClickType } from "../../Tracking";
import { renderRegionData } from "../../../../Util/RegionDataRenderer";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

// Define the expected data prop type
interface PieChartProps {
  urls: UrlClickType[]; // Object with labels as keys and values as numbers
}

export type PieData = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[] | string;
    }
  ];
};

const chartData: PieData = {
  labels: [],
  datasets: [
    {
      label: "Clicks",
      data: [],
      backgroundColor: [
        "#FFB3BA",
        "#FFDFBA",
        "#FFFFBA",
        "#BAFFC9",
        "#BAE1FF",
        "#E6C8FF",
        "#FFC8DD",
        "#D4A5A5",
        "#A0E7E5",
        "#B5EAD7",
      ],
    },
  ],
};

// Chart options with correctly typed tooltip callback
const options: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white",
      },
    },
    colors: {
      enabled: true,
    },
  },
};

export const DisplayRegionData = ({ urls }: PieChartProps) => {
  const [isDataReady, setIsDataReady] = useState(true);
  const [regionData, setRegionData] = useState(chartData);
  const chartRef = useRef<ChartJSOrUndefined<"pie">>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const regionData = renderRegionData(urls, chartData);

      if (chart.data) {
        chart.data.labels = regionData.labels;
        chart.data.datasets[0].data = regionData.datasets[0].data;
        chart.update();
      }
    }
  }, [urls]);

  useEffect(() => {
    if (regionData.datasets[0].data.length > 0) {
      setIsDataReady(true);
    }
  }, [regionData]);

  return (
    <div className={styles.pieWrapper}>
      <h2 className={styles.graphTitle}>Clicks By Region</h2>
      {isDataReady && (
        <Pie ref={chartRef} data={regionData} options={options} />
      )}
    </div>
  );
};
