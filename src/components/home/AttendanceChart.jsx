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
  const data = [];

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
