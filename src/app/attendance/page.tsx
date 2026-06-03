import { requireAdmin } from "@/backend/services/auth";
import { readDb } from "@/backend/services/database";
import { AttendanceManager } from "@/components/attendance/attendance-manager";

export default async function AttendancePage() {
  await requireAdmin();
  const db = await readDb();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance management</h1>
        <p className="text-slate-500">
          View, filter, manually correct, and export attendance records received
          from the Android app.
        </p>
      </div>
      <AttendanceManager initialRecords={db.attendance} employees={db.users} />
    </div>
  );
}
