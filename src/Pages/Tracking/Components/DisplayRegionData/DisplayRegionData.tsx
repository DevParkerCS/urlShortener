import styles from "./DisplayRegionData.module.scss";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem,
  Colors,
} from "chart.js";
import { useEffect, useState } from "react";
import { UrlClickType } from "../../Tracking";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

// Define the expected data prop type
interface PieChartProps {
  urls: UrlClickType[]; // Object with labels as keys and values as numbers
}

const chartData: ChartData<"pie"> = {
  labels: [],
  datasets: [
    {
      label: "Regions",
      data: [],
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
  },
};

export const DisplayRegionData = ({ urls }: PieChartProps) => {
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    let index = 0;
    chartData.labels = [];
    for (const [key, value] of Object.entries(data)) {
      chartData.datasets[0].data[index] = value;
      chartData.labels[index] = key;
      index++;
    }
    setIsDataReady(true);
  }, []);
  const data = {
    America: 45,
    Europe: 25,
    Asia: 20,
    Australia: 10,
  };

  return (
    <div className={styles.pieWrapper}>
      <h2 className={styles.graphTitle}>Clicks By Region</h2>
      {isDataReady && <Pie data={chartData} options={options} />}
    </div>
  );
};
