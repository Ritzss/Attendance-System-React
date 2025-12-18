import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendancePie = () => {

  const data = [
  { date: "2024-12-01", attendance: 8 },
  { date: "2024-12-02", attendance: 10 },
  { date: "2024-12-03", attendance: 7 },
  { date: "2024-12-04", attendance: 9 },
  { date: "2024-12-05", attendance: 6 },
  { date: "2024-12-06", attendance: 10 },
  { date: "2024-12-07", attendance: 0 },   // Sunday / holiday
  { date: "2024-12-08", attendance: 0 },   // Sunday / holiday
  { date: "2024-12-09", attendance: 9 },
  { date: "2024-12-10", attendance: 8 },
  { date: "2024-12-11", attendance: 10 },
  { date: "2024-12-12", attendance: 7 },
  { date: "2024-12-13", attendance: 6 },
  { date: "2024-12-14", attendance: 8 },
  { date: "2024-12-15", attendance: 0 },
  { date: "2024-12-16", attendance: 10 },
  { date: "2024-12-17", attendance: 9 },
  { date: "2024-12-18", attendance: 7 },
  { date: "2024-12-19", attendance: 6 },
  { date: "2024-12-20", attendance: 8 },
  { date: "2024-12-21", attendance: 7 },
  { date: "2024-12-22", attendance: 0 },
  { date: "2024-12-23", attendance: 10 },
  { date: "2024-12-24", attendance: 9 },
  { date: "2024-12-25", attendance: 0 },   // Christmas off
  { date: "2024-12-26", attendance: 8 },
  { date: "2024-12-27", attendance: 7 },
  { date: "2024-12-28", attendance: 6 },
  { date: "2024-12-29", attendance: 0 },
  { date: "2024-12-30", attendance: 9 },
  { date: "2024-12-31", attendance: 10 }
];

  let present = 0, absent = 0, holidays = 0;

  data.forEach((day) => {
    const d = new Date(day.date);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6; // Sun or Sat

    if (isWeekend && day.attendance === 0) {
      holidays++;
    } else if (!isWeekend && day.attendance === 0) {
      absent++;
    } else {
      present++;
    }
  });

  const chartData = {
    labels: ["Present", "Absent", "Holiday / Weekend"],
    datasets: [
      {
        label: "Attendance Distribution",
        data: [present, absent, holidays],
        backgroundColor: [
          "#85F801", // vibrant green
          "#FF1744", // vibrant red
          "#FFBC08", // vibrant blue
        ],
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 40,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "center",
        labels: {
          color: "#ffffff",
          font: { size: -1 },
        },
      },
    },
    cutout: "60%",
    layout:{
        padding: 20,
    }
  };

  return (
    <div className="w-full  rounded-4xl h-[28vh] ">
      

      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default AttendancePie;
