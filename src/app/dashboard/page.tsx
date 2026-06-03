import { readDb } from "@/backend/services/database";
import { buildTrend, getDashboardMetrics } from "@/backend/services/metrics";
import { Card } from "@/components/ui/card";
import { WeeklyChart, MonthlyChart } from "@/components/charts/attendance-charts";

export default async function DashboardPage() {
  const db = await readDb();
  const metrics = getDashboardMetrics(db.users, db.attendance);
  const cards = [
    ["Total Employees", metrics.totalEmployees, "👥", "text-slate-700"],
    ["Present Today", metrics.presentToday, "✓", "text-green-600"],
    ["Late Today", metrics.lateToday, "◷", "text-amber-600"],
    ["Absent Today", metrics.absentToday, "×", "text-red-600"],
    ["Attendance %", `${metrics.attendancePercentage}%`, "%", "text-blue-600"],
  ] as const;
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-slate-500">Live overview of today&apos;s attendance operations.</p></div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, icon, color]) => <Card key={label}><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{label}</p><span className={color}>{icon}</span></div><p className="mt-4 text-3xl font-bold">{value}</p></Card>)}
      </section>
      <section className="grid gap-6 xl:grid-cols-2"><WeeklyChart data={buildTrend(db.attendance, 7)} /><MonthlyChart data={buildTrend(db.attendance, 30)} /></section>
      <Card><h2 className="mb-4 font-semibold">Recent activity</h2><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-slate-500"><th className="py-3">Employee</th><th>Status</th><th>Timestamp</th><th>Synced</th></tr></thead><tbody>{db.attendance.slice(0, 8).map((record) => <tr key={record.id} className="border-b last:border-0"><td className="py-3">{db.users.find((user) => user.employeeId === record.employeeId)?.name ?? record.employeeId}</td><td>{record.status}</td><td>{new Date(record.timestamp).toLocaleString()}</td><td>{record.synced ? "Yes" : "No"}</td></tr>)}{db.attendance.length === 0 && <tr><td className="py-8 text-center text-slate-500" colSpan={4}>No attendance activity yet.</td></tr>}</tbody></table></div></Card>
    </div>
  );
}
