import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AttendanceChart = () => {
  const data = [
    { date: "2024-12-01", attendance: 0 },
    { date: "2024-12-02", attendance: 10 },
    { date: "2024-12-03", attendance: 11 },
    { date: "2024-12-04", attendance: 9 },
    { date: "2024-12-05", attendance: 12 },
    { date: "2024-12-06", attendance: 11 },
    { date: "2024-12-07", attendance: 9 }, // working Saturday
    { date: "2024-12-08", attendance: 0 }, // Sunday
    { date: "2024-12-09", attendance: 10 },
    { date: "2024-12-10", attendance: 11 },
    { date: "2024-12-11", attendance: 9 },
    { date: "2024-12-12", attendance: 11 },
    { date: "2024-12-13", attendance: 10 },
    { date: "2024-12-14", attendance: 0 }, // holiday Saturday
    { date: "2024-12-15", attendance: 0 },
    { date: "2024-12-16", attendance: 10 },
    { date: "2024-12-17", attendance: 11 },
    { date: "2024-12-18", attendance: 9 },
    { date: "2024-12-19", attendance: 12 },
    { date: "2024-12-20", attendance: 10 },
    { date: "2024-12-21", attendance: 8 }, // working Saturday
    { date: "2024-12-22", attendance: 0 },
    { date: "2024-12-23", attendance: 10 },
    { date: "2024-12-24", attendance: 11 },
    { date: "2024-12-25", attendance: 14 },
    { date: "2024-12-26", attendance: 12 },
    { date: "2024-12-27", attendance: 10 },
    { date: "2024-12-28", attendance: 0 }, // holiday Saturday
    { date: "2024-12-29", attendance: 0 },
    { date: "2024-12-30", attendance: 11 },
    { date: "2024-12-31", attendance: 11 },
  ];

  return (
    <div className="shadow-md w-full h-[28vh] rounded-4xl">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right:30, left: 20, bottom: 50 }}
          >
            <CartesianGrid stroke="#fff" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fill: "white", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "white", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid white",
                color: "white",
              }}
              itemStyle={{ color: "white" }}
              labelStyle={{ color: "white" }}
            />
            <Legend wrapperStyle={{ color: "white" }} verticalAlign="top" />
            <Bar dataKey="attendance" fill="white" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
