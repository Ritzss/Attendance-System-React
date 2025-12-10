import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendancePie = () => {

  const data = [];

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
        position: "left",
        labels: {
          color: "#ffffff",
          font: { size: 12 },
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
