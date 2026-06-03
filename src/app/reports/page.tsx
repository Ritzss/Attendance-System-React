import { readDb } from "@/backend/services/database";
import { ReportsPanel } from "@/components/attendance/reports-panel";

export default async function ReportsPage() {
  const db = await readDb();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Reports</h1><p className="text-slate-500">Generate daily, weekly, and monthly reports with CSV or PDF exports.</p></div><ReportsPanel initialRecords={db.attendance} employees={db.users} /></div>;
}
