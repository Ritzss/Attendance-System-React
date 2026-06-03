import { NextResponse } from "next/server";
<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb } from "@/backend/services/database";
import { buildTrend, getDashboardMetrics } from "@/backend/services/metrics";

export async function GET() {
<<<<<<< HEAD
  await requireAdmin();
  const db = await readDb();
  const lateCounts = db.users
    .map((employee) => ({
      name: employee.name,
      employeeId: employee.employeeId,
      late: db.attendance.filter(
        (record) =>
          record.employeeId === employee.employeeId && record.status === "Late",
      ).length,
    }))
    .sort((a, b) => b.late - a.late)
    .slice(0, 5);
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
  const db = await readDb();
  const lateCounts = db.users.map((employee) => ({
    name: employee.name,
    employeeId: employee.employeeId,
    late: db.attendance.filter((record) => record.employeeId === employee.employeeId && record.status === "Late").length,
  })).sort((a, b) => b.late - a.late).slice(0, 5);
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  return NextResponse.json({
    metrics: getDashboardMetrics(db.users, db.attendance),
    weekly: buildTrend(db.attendance, 7),
    monthly: buildTrend(db.attendance, 30),
    lateCounts,
    recent: db.attendance.slice(0, 8),
    employees: db.users,
  });
}
