import { readDb } from "@/backend/services/database";
import { buildTrend, getDashboardMetrics } from "@/backend/services/metrics";
import { Card } from "@/components/ui/card";
import {
  WeeklyChart,
  MonthlyChart,
} from "@/components/charts/attendance-charts";

export default async function AnalyticsPage() {
  const db = await readDb();
  const metrics = getDashboardMetrics(db.users, db.attendance);
  const late = db.users
    .map((employee) => ({
      ...employee,
      count: db.attendance.filter(
        (record) =>
          record.employeeId === employee.employeeId && record.status === "Late",
      ).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-slate-500">
          Trends, late employees, percentages, and monthly comparison.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Attendance percentage</p>
          <p className="mt-3 text-4xl font-bold">
            {metrics.attendancePercentage}%
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Total tracked records</p>
          <p className="mt-3 text-4xl font-bold">{db.attendance.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Most common issue</p>
          <p className="mt-3 text-4xl font-bold">Late</p>
        </Card>
      </div>
      <section className="grid gap-6 xl:grid-cols-2">
        <WeeklyChart data={buildTrend(db.attendance, 7)} />
        <MonthlyChart data={buildTrend(db.attendance, 30)} />
      </section>
      <Card>
        <h2 className="mb-4 font-semibold">Most late employees</h2>
        {late.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between border-b py-3 last:border-0"
          >
            <span>{employee.name}</span>
            <strong>{employee.count} late</strong>
          </div>
        ))}
      </Card>
    </div>
  );
}
