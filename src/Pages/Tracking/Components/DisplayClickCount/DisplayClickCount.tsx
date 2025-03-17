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
};

const MONTHS = [
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

type DataType = {
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

export const DisplayClickCount = ({ urlData }: DisplayClickCountProps) => {
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
    let newData = { ...clickData };
    newData.datasets[0].data.length = 12;
    newData.labels.length = 12;
    for (let i = 0; i < 12; i++) {
      newData.labels[i] = MONTHS[i];
      newData.datasets[0].data[i] = 0;
    }

    for (let i = 0; i < urlData.length; i++) {
      const monthIndex = urlData[i].clickedAt.getMonth();
      const monthData = newData.datasets[0].data;
      monthData[monthIndex]++;
    }
    setClickData(newData);
  };
  console.log(clickData);
  return (
    <div className={styles.graphWrapper}>
      {isDataReady && <Bar data={clickData} options={options} />}
    </div>
  );
};
