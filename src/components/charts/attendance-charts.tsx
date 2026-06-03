"use client";
<<<<<<< HEAD
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
=======
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { Card } from "@/components/ui/card";

type Trend = { label: string; Present: number; Late: number; Absent: number };
export function WeeklyChart({ data }: { data: Trend[] }) {
<<<<<<< HEAD
  return (
    <Card>
      <h2 className="mb-4 font-semibold">Weekly attendance</h2>
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="Present" fill="#16a34a" radius={8} />
            <Bar dataKey="Late" fill="#f59e0b" radius={8} />
            <Bar dataKey="Absent" fill="#ef4444" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
export function MonthlyChart({ data }: { data: Trend[] }) {
  return (
    <Card>
      <h2 className="mb-4 font-semibold">Monthly trend</h2>
      <div className="h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" hide />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Present"
              stroke="#16a34a"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="Late"
              stroke="#f59e0b"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="Absent"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
=======
  return <Card><h2 className="mb-4 font-semibold">Weekly attendance</h2><div className="h-72"><ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="Present" fill="#16a34a" radius={8} /><Bar dataKey="Late" fill="#f59e0b" radius={8} /><Bar dataKey="Absent" fill="#ef4444" radius={8} /></BarChart></ResponsiveContainer></div></Card>;
}
export function MonthlyChart({ data }: { data: Trend[] }) {
  return <Card><h2 className="mb-4 font-semibold">Monthly trend</h2><div className="h-72"><ResponsiveContainer><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" hide /><YAxis allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="Present" stroke="#16a34a" strokeWidth={3} /><Line type="monotone" dataKey="Late" stroke="#f59e0b" strokeWidth={3} /><Line type="monotone" dataKey="Absent" stroke="#ef4444" strokeWidth={3} /></LineChart></ResponsiveContainer></div></Card>;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
