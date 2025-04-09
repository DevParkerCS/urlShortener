import { useState } from "react";
import styles from "./DataButtons.module.scss";

type DataButtonsProps = {
  setTimeFrame: React.Dispatch<React.SetStateAction<string>>;
};

export const DataButtons = ({ setTimeFrame }: DataButtonsProps) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        setTimeFrame("monthly");
        break;
      case 1:
        setTimeFrame("weekly");
        break;
      case 2:
        setTimeFrame("daily");
        break;
      case 3:
        setTimeFrame("hourly");
        break;
      case 4:
        setTimeFrame("recent");
        break;
    }
    setActiveBtn(index);
  };

  return (
    <div className={styles.dataBtnsWrapper}>
      <button
        className={`${styles.dataBtn} ${activeBtn === 0 ? styles.active : ""}`}
        onClick={() => handleClick(0)}
      >
        Monthly
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 1 ? styles.active : ""}`}
        onClick={() => handleClick(1)}
      >
        Weekly
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 2 ? styles.active : ""}`}
        onClick={() => handleClick(2)}
      >
        Daily
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 3 ? styles.active : ""}`}
        onClick={() => handleClick(3)}
      >
        Hourly
      </button>
      <button
        className={`${styles.dataBtn} ${activeBtn === 4 ? styles.active : ""}`}
        onClick={() => handleClick(4)}
      >
        Last Hour
      </button>
    </div>
  );
};
