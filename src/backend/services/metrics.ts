import dayjs from "dayjs";
import type { AttendanceRecord, Employee } from "@/types";

export function isSameDay(timestamp: string, date = dayjs()) {
  return dayjs(timestamp).format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
}

<<<<<<< HEAD
export function getDashboardMetrics(
  employees: Employee[],
  attendance: AttendanceRecord[],
) {
  const today = attendance.filter((record) => isSameDay(record.timestamp));
  const presentToday = today.filter(
    (record) => record.status === "Present",
  ).length;
  const lateToday = today.filter((record) => record.status === "Late").length;
  const absentToday = Math.max(
    employees.length - presentToday - lateToday,
    today.filter((record) => record.status === "Absent").length,
  );
  const attendancePercentage = employees.length
    ? Math.round(((presentToday + lateToday) / employees.length) * 100)
    : 0;
  return {
    totalEmployees: employees.length,
    presentToday,
    lateToday,
    absentToday,
    attendancePercentage,
  };
=======
export function getDashboardMetrics(employees: Employee[], attendance: AttendanceRecord[]) {
  const today = attendance.filter((record) => isSameDay(record.timestamp));
  const presentToday = today.filter((record) => record.status === "Present").length;
  const lateToday = today.filter((record) => record.status === "Late").length;
  const absentToday = Math.max(employees.length - presentToday - lateToday, today.filter((record) => record.status === "Absent").length);
  const attendancePercentage = employees.length ? Math.round(((presentToday + lateToday) / employees.length) * 100) : 0;
  return { totalEmployees: employees.length, presentToday, lateToday, absentToday, attendancePercentage };
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}

export function buildTrend(attendance: AttendanceRecord[], days: number) {
  return Array.from({ length: days }).map((_, index) => {
    const date = dayjs().subtract(days - index - 1, "day");
<<<<<<< HEAD
    const records = attendance.filter((record) =>
      isSameDay(record.timestamp, date),
    );
=======
    const records = attendance.filter((record) => isSameDay(record.timestamp, date));
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
    return {
      label: date.format(days > 10 ? "MMM D" : "ddd"),
      Present: records.filter((record) => record.status === "Present").length,
      Late: records.filter((record) => record.status === "Late").length,
      Absent: records.filter((record) => record.status === "Absent").length,
    };
  });
}
