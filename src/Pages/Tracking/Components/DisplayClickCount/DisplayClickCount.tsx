import { Bar } from "react-chartjs-2";
import styles from "./DisplayClickCount.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { UrlClickType } from "../../Tracking";
import { useEffect, useState } from "react";
import { renderClickData } from "../../../../Util/ClickDataRenderer";

ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale
);

type DisplayClickCountProps = {
  urlData: UrlClickType[];
  timeFrame: string;
  startDay: Date;
  endDay: Date;
};

export type DataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

const data: DataType = {
  labels: [],
  datasets: [
    {
      label: "Clicks",
      data: [],
      backgroundColor: "#f5eedc",
    },
  ],
};

const options: ChartOptions<"bar"> = {
  scales: {
    y: {
      beginAtZero: true,
      type: "linear",
      ticks: {
        stepSize: 1,
        color: "white",
      },
      grid: {
        color: "white",
      },
    },
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "white",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white",
      },
    },
  },
  responsive: true,
};

export const DisplayClickCount = ({
  urlData,
  timeFrame,
  startDay,
  endDay,
}: DisplayClickCountProps) => {
  const [clickData, setClickData] = useState<DataType>(data);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (urlData.length > 0) {
      processDataByMonth();
    }
  }, [urlData]);

  useEffect(() => {
    if (clickData.labels.length > 0) {
      setIsDataReady(true);
    }
  }, [clickData]);

  const processDataByMonth = () => {
    setIsDataReady(false);
    const render: DataType | undefined = renderClickData(
      urlData,
      clickData,
      timeFrame,
      startDay,
      endDay
    );

    setClickData(render || data);
  };

  return (
    <div className={styles.graphWrapper}>
      <h2 className={styles.graphTitle}>Clicks By Date</h2>
      {isDataReady && <Bar data={clickData} options={options} />}
    </div>
  );
};
