"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import type { AttendanceRecord, Employee } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { downloadCsv } from "@/utils/export";

export function AttendanceManager({
  initialRecords,
  employees,
}: {
  initialRecords: AttendanceRecord[];
  employees: Employee[];
}) {
  const [records, setRecords] = useState(initialRecords);
  const [date, setDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const filtered = records.filter(
    (record) =>
      (!date || record.timestamp.startsWith(date)) &&
      (!employeeId || record.employeeId === employeeId),
  );
  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok)
      return toast.error(data.error ?? "Failed to add attendance");
    setRecords((items) => [data.record, ...items]);
    toast.success("Attendance record added");
  }
  const rows = filtered.map((record) => ({
    employeeId: record.employeeId,
    employee:
      employees.find((e) => e.employeeId === record.employeeId)?.name ??
      record.employeeId,
    status: record.status,
    timestamp: record.timestamp,
    synced: record.synced,
  }));
  return (
    <div className="space-y-6">
      <Card>
        <form
          onSubmit={add}
          className="grid gap-3 md:grid-cols-[1fr_180px_auto]"
        >
          <Select name="employeeId" required>
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.employeeId}>
                {employee.name} ({employee.employeeId})
              </option>
            ))}
          </Select>
          <Select name="status" required>
            <option>Present</option>
            <option>Late</option>
            <option>Absent</option>
          </Select>
          <Button>Add record</Button>
        </form>
      </Card>
      <Card>
        <div className="mb-4 grid gap-3 md:grid-cols-[180px_1fr_auto]">
          <Input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <Select
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
          >
            <option value="">All employees</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.employeeId}>
                {employee.name}
              </option>
            ))}
          </Select>
          <Button onClick={() => downloadCsv("attendance.csv", rows)}>
            Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-3">Employee</th>
                <th>Status</th>
                <th>Date & time</th>
                <th>Synced</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr className="border-b last:border-0" key={record.id}>
                  <td className="py-3">
                    {employees.find(
                      (employee) => employee.employeeId === record.employeeId,
                    )?.name ?? record.employeeId}
                  </td>
                  <td>{record.status}</td>
                  <td>{new Date(record.timestamp).toLocaleString()}</td>
                  <td>{record.synced ? "Yes" : "No"}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="py-8 text-center text-slate-500" colSpan={4}>
                    No records match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
