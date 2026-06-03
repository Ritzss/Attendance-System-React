"use client";

import { useState } from "react";
import type { AttendanceRecord, Employee } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { downloadCsv } from "@/utils/export";

export function ReportsPanel({ initialRecords, employees }: { initialRecords: AttendanceRecord[]; employees: Employee[] }) {
  const [type, setType] = useState("daily");
  const rows = initialRecords.map((record) => ({ employee: employees.find((employee) => employee.employeeId === record.employeeId)?.name ?? record.employeeId, employeeId: record.employeeId, status: record.status, timestamp: record.timestamp }));
  function exportPdf() {
    const content = rows.map((row) => `${row.employee} - ${row.status} - ${new Date(row.timestamp).toLocaleString()}`).join("\n");
    const blob = new Blob([`%PDF-1.1\n1 0 obj<<>>endobj\n2 0 obj<< /Length ${content.length + 40} >>stream\n${type.toUpperCase()} ATTENDANCE REPORT\n${content}\nendstream endobj\ntrailer<<>>\n%%EOF`], { type: "application/pdf" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `${type}-attendance-report.pdf`; link.click(); URL.revokeObjectURL(url);
  }
  return <Card><div className="mb-4 flex flex-col gap-3 sm:flex-row"><Select value={type} onChange={(event) => setType(event.target.value)}><option value="daily">Daily report</option><option value="weekly">Weekly report</option><option value="monthly">Monthly report</option></Select><Button onClick={() => downloadCsv(`${type}-attendance-report.csv`, rows)}>Export CSV</Button><Button onClick={exportPdf} className="bg-slate-100 text-slate-900 hover:bg-slate-200">Export PDF</Button></div><table className="w-full text-sm"><thead><tr className="border-b text-left text-slate-500"><th className="py-3">Employee</th><th>Status</th><th>Timestamp</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.employeeId}-${index}`} className="border-b last:border-0"><td className="py-3">{row.employee}</td><td>{row.status}</td><td>{new Date(row.timestamp).toLocaleString()}</td></tr>)}{rows.length === 0 && <tr><td className="py-8 text-center text-slate-500" colSpan={3}>No report data yet.</td></tr>}</tbody></table></Card>;
}
