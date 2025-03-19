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
} from "chart.js";
import { UrlClickType } from "../../Tracking";
import { useEffect, useState } from "react";
import { renderData } from "../../../../Util/dataRenderer";

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
      backgroundColor: "#4a6572",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        min: 1,
        stepSize: 1,
      },
    },
  },
  responsive: true,
};

export const DisplayClickCount = ({
  urlData,
  timeFrame,
}: DisplayClickCountProps) => {
  const [clickData, setClickData] = useState<DataType>(data);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    processDataByMonth();
  }, [urlData]);

  useEffect(() => {
    if (clickData.labels.length > 0) {
      setIsDataReady(true);
    }
  }, [clickData]);

  const processDataByMonth = () => {
    setIsDataReady(false);
    const render: DataType | undefined = renderData(
      urlData,
      clickData,
      timeFrame
    );

    setClickData(render || data);
  };

  return (
    <div className={styles.graphWrapper}>
      {isDataReady && <Bar data={clickData} options={options} />}
    </div>
  );
};
