import styles from "./DateSelector.module.scss";

type DateSelectorProps = {
  setStartDay: React.Dispatch<React.SetStateAction<Date>>;
  setEndDay: React.Dispatch<React.SetStateAction<Date>>;
  timeFrame: string;
};

export const DateSelector = ({
  setStartDay,
  setEndDay,
  timeFrame,
}: DateSelectorProps) => {
  const handleStartDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    setStartDay(date);
  };

  const handleEndDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    setEndDay(date);
  };

  switch (timeFrame) {
    case "monthly":
      return (
        <div className={styles.dateSelectionWrapper}>
          <DateInput label={"Start Date:"} cb={handleStartDayChange} />
          <DateInput label={"End Date:"} cb={handleEndDayChange} />
        </div>
      );
    case "weekly":
      return (
        <div className={styles.dateSelectionWrapper}>
          <DateInput label={"Start Date:"} cb={handleStartDayChange} />
          <DateInput label={"End Date:"} cb={handleEndDayChange} />
        </div>
      );
    case "daily":
      return (
        <div className={styles.dateSelectionWrapper}>
          <DateInput label={"Start Date:"} cb={handleStartDayChange} />
          <DateInput label={"End Date:"} cb={handleEndDayChange} />
        </div>
      );
    case "hourly":
      return (
        <div className={styles.dateSelectionWrapper}>
          <DateInput label={"Start Date:"} cb={handleStartDayChange} />
        </div>
      );
    case "recent":
      return <div></div>;
    default:
      return <div>yearly</div>;
  }
};

type DateInputProps = {
  cb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const DateInput = ({ cb, label }: DateInputProps) => {
  return (
    <div className={styles[label.split(" ")[0] + "Input"]}>
      <label htmlFor={label + "-input"}>{label}</label>
      <input id={label + "-input"} type="date" onChange={cb} />
    </div>
  );
};
