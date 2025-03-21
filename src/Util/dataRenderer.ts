import { DataType } from "../Pages/Tracking/Components/DisplayClickCount/DisplayClickCount";
import { UrlClickType } from "../Pages/Tracking/Tracking";

export const renderData = (
  urls: UrlClickType[],
  graphData: DataType,
  timeFrame: string,
  startDay: Date,
  endDay: Date
) => {
  graphData.labels = [];
  switch (timeFrame) {
    case "monthly":
      return setupMonthly(urls, graphData);
    case "daily":
      return setupDaily(urls, graphData, startDay, endDay);
    case "hourly":
      return setupHourly(urls, graphData);
    case "recent":
      return setupCurrent(urls, graphData);
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

  const hourData = newData.datasets[0].data;

  for (let i = 0; i < urls.length; i++) {
    const hourIndex = Math.floor(urls[i].clickedAt.getHours() / 2);
    console.log(urls[i].clickedAt);
    hourData[hourIndex]++;
  }

  return newData;
};

const setupCurrent = (urls: UrlClickType[], graphData: DataType) => {
  let newData = { ...graphData };
  newData.datasets[0].data = Array(12).fill(0);
  const date = new Date();
  const startDate = new Date(date);
  startDate.setHours(startDate.getHours() - 1);

  let multiple = 0;

  // Add labels for the previous hour in 5 minute segments
  for (let i = 0; i < 12; i++) {
    let updatedMinutes = startDate.getMinutes() + multiple * 5;
    multiple++;
    // Add an hour since the minutes are greater than an hour
    if (updatedMinutes >= 60) {
      startDate.setHours(startDate.getHours() + 1);
      startDate.setMinutes(updatedMinutes - 60);
      updatedMinutes = startDate.getMinutes();
      multiple = 1;
    }

    newData.labels[i] =
      (startDate.getHours() <= 12
        ? startDate.getHours()
        : startDate.getHours() - 12) +
      ":" +
      (updatedMinutes < 10 ? "0" + updatedMinutes : updatedMinutes);
  }

  // Determine how many columns exist in the previous hour
  const offset = (60 - date.getMinutes()) % 12;

  // Add click data to correct column
  for (let i = 0; i < urls.length; i++) {
    const clickedAt = urls[i].clickedAt;

    // Calculate the difference in minutes between current time and clicked time
    const clickedMinutes = clickedAt.getMinutes() + clickedAt.getHours() * 60;
    const currentMinutes = date.getMinutes() + date.getHours() * 60;
    const diffInMinutes = currentMinutes - clickedMinutes;

    // Break into 5 minute segments
    let index = Math.floor(diffInMinutes / 5);

    // Reverse index since 0 is an hour ago
    index = 11 - index;

    newData.datasets[0].data[index]++;
  }

  return newData;
};

const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
const setupDaily = (
  urls: UrlClickType[],
  graphData: DataType,
  startDay: Date,
  endDay: Date
) => {
  // Get the max days in the current month
  const maxDays = new Date(
    startDay.getFullYear(),
    startDay.getMonth() + 1,
    0
  ).getDate();

  let daysGap = endDay.getDate() - startDay.getDate();

  // The start day and end day are in different months
  if (daysGap < 0) {
    daysGap = maxDays - startDay.getDate() + endDay.getDate();
  }
  let newData = { ...graphData };
  newData.datasets[0].data = Array(daysGap + 1).fill(0);

  let curDay = new Date(startDay);

  // Setup labels for days between start and end
  for (let i = 0; i < daysGap + 1; i++) {
    if (curDay.getDate() > maxDays) {
      curDay.setMonth(curDay.getMonth() + 1);
      curDay.setDate(1);
    }
    newData.labels[i] = DAYS[curDay.getDay()];
    curDay.setDate(curDay.getDate() + 1);
  }

  // Parse url click data
  for (let i = 0; i < urls.length; i++) {
    let curIndex = urls[i].clickedAt.getDate() - startDay.getDate();

    // If the current click data is in a new month
    if (curIndex < 0) {
      curIndex = maxDays - startDay.getDate() + urls[i].clickedAt.getDate();
    }
    // Increase click count
    newData.datasets[0].data[curIndex]++;
  }

  return newData;
};
