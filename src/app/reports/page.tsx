<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb } from "@/backend/services/database";
import { ReportsPanel } from "@/components/attendance/reports-panel";

export default async function ReportsPage() {
<<<<<<< HEAD
  await requireAdmin();
  const db = await readDb();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-slate-500">
          Generate daily, weekly, and monthly reports with CSV or PDF exports.
        </p>
      </div>
      <ReportsPanel initialRecords={db.attendance} employees={db.users} />
    </div>
  );
=======
  const db = await readDb();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Reports</h1><p className="text-slate-500">Generate daily, weekly, and monthly reports with CSV or PDF exports.</p></div><ReportsPanel initialRecords={db.attendance} employees={db.users} /></div>;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
