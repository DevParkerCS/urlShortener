import { Bar } from "react-chartjs-2";
import { Nav } from "../../Components/Nav/Nav";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import styles from "./Tracking.module.scss";
import { useEffect } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale
);

export const Tracking = () => {
  useEffect(() => {}, []);

  const getLinkData = async () => {
    const response = await axios.get("http://localhost:3000/ae74a5cc");
  };

  const data = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Clicks",
        data: [400, 300, 500],
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <div>
      <Nav />
      <div className={styles.chartContainer}>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
};
