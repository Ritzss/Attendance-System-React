"use client";

import { FormEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { Employee } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

function validEmployee(input: Record<string, FormDataEntryValue>) {
<<<<<<< HEAD
  return (
    String(input.name ?? "").length >= 2 &&
    String(input.email ?? "").includes("@") &&
    String(input.department ?? "").length >= 2
  );
}

export function EmployeeManager({
  initialEmployees,
}: {
  initialEmployees: Employee[];
}) {
=======
  return String(input.name ?? "").length >= 2 && String(input.email ?? "").includes("@") && String(input.department ?? "").length >= 2;
}

export function EmployeeManager({ initialEmployees }: { initialEmployees: Employee[] }) {
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  const [employees, setEmployees] = useState(initialEmployees);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [editing, setEditing] = useState<Employee | null>(null);
<<<<<<< HEAD
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];
  const filtered = useMemo(
    () =>
      employees.filter((employee) => {
        const matchesQuery = [
          employee.name,
          employee.email,
          employee.employeeId,
        ].some((field) => field.toLowerCase().includes(query.toLowerCase()));
        return (
          matchesQuery && (!department || employee.department === department)
        );
      }),
    [employees, query, department],
  );
=======
  const departments = [...new Set(employees.map((employee) => employee.department))];
  const filtered = useMemo(() => employees.filter((employee) => {
    const matchesQuery = [employee.name, employee.email, employee.employeeId].some((field) => field.toLowerCase().includes(query.toLowerCase()));
    return matchesQuery && (!department || employee.department === department);
  }), [employees, query, department]);
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
<<<<<<< HEAD
    if (!validEmployee(values))
      return toast.error("Please complete all employee fields.");
    const response = await fetch(
      editing ? `/api/employees/${editing.id}` : "/api/employees",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );
    const payload = await response.json();
    if (!response.ok)
      return toast.error(payload.error ?? "Employee action failed");
    if (editing)
      setEmployees((items) =>
        items.map((item) =>
          item.id === payload.employee.id ? payload.employee : item,
        ),
      );
    else {
      setEmployees((items) => [payload.employee, ...items]);
      toast.success(`Password generated: ${payload.plainPassword}`);
    }
    setEditing(null);
    form.reset();
    toast.success(editing ? "Employee updated" : "Employee created");
  }
  async function remove(employee: Employee) {
    if (!confirm(`Delete ${employee.name}?`)) return;
    const response = await fetch(`/api/employees/${employee.id}`, {
      method: "DELETE",
    });
    if (!response.ok) return toast.error("Delete failed");
    setEmployees((items) => items.filter((item) => item.id !== employee.id));
    toast.success("Employee deleted");
  }
  return (
    <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
      <Card>
        <h2 className="text-lg font-semibold">
          {editing ? "Edit employee" : "Create employee"}
        </h2>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <Input
            name="name"
            placeholder="Full name"
            defaultValue={editing?.name}
            key={`name-${editing?.id ?? "new"}`}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={editing?.email}
            key={`email-${editing?.id ?? "new"}`}
          />
          <Input
            name="department"
            placeholder="Department"
            defaultValue={editing?.department}
            key={`dept-${editing?.id ?? "new"}`}
          />
          <Button className="w-full">
            {editing ? "Save changes" : "Create and generate credentials"}
          </Button>
          {editing && (
            <button
              type="button"
              className="w-full text-sm text-slate-500"
              onClick={() => setEditing(null)}
            >
              Cancel editing
            </button>
          )}
        </form>
      </Card>
      <Card>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Search name, email, or ID"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">All departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-3 pr-4">Employee ID</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Department</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((employee) => (
                <tr key={employee.id} className="border-b last:border-0">
                  <td className="py-3 pr-4">{employee.employeeId}</td>
                  <td className="py-3 pr-4">{employee.name}</td>
                  <td className="py-3 pr-4">{employee.email}</td>
                  <td className="py-3 pr-4">{employee.department}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-2">
                      <Button
                        className="bg-slate-100 text-slate-900 hover:bg-slate-200"
                        onClick={() => setEditing(employee)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => remove(employee)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
=======
    if (!validEmployee(values)) return toast.error("Please complete all employee fields.");
    const response = await fetch(editing ? `/api/employees/${editing.id}` : "/api/employees", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    const payload = await response.json();
    if (!response.ok) return toast.error(payload.error ?? "Employee action failed");
    if (editing) setEmployees((items) => items.map((item) => item.id === payload.employee.id ? payload.employee : item));
    else { setEmployees((items) => [payload.employee, ...items]); toast.success(`Password generated: ${payload.plainPassword}`); }
    setEditing(null); form.reset(); toast.success(editing ? "Employee updated" : "Employee created");
  }
  async function remove(employee: Employee) {
    if (!confirm(`Delete ${employee.name}?`)) return;
    const response = await fetch(`/api/employees/${employee.id}`, { method: "DELETE" });
    if (!response.ok) return toast.error("Delete failed");
    setEmployees((items) => items.filter((item) => item.id !== employee.id)); toast.success("Employee deleted");
  }
  return <div className="grid gap-6 xl:grid-cols-[380px_1fr]"><Card><h2 className="text-lg font-semibold">{editing ? "Edit employee" : "Create employee"}</h2><form onSubmit={submit} className="mt-4 space-y-3"><Input name="name" placeholder="Full name" defaultValue={editing?.name} key={`name-${editing?.id ?? "new"}`} /><Input name="email" type="email" placeholder="Email" defaultValue={editing?.email} key={`email-${editing?.id ?? "new"}`} /><Input name="department" placeholder="Department" defaultValue={editing?.department} key={`dept-${editing?.id ?? "new"}`} /><Button className="w-full">{editing ? "Save changes" : "Create and generate credentials"}</Button>{editing && <button type="button" className="w-full text-sm text-slate-500" onClick={() => setEditing(null)}>Cancel editing</button>}</form></Card><Card><div className="mb-4 grid gap-3 sm:grid-cols-2"><Input placeholder="Search name, email, or ID" value={query} onChange={(event) => setQuery(event.target.value)} /><Select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">All departments</option>{departments.map((item) => <option key={item} value={item}>{item}</option>)}</Select></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-slate-500"><th className="py-3 pr-4">Employee ID</th><th className="py-3 pr-4">Name</th><th className="py-3 pr-4">Email</th><th className="py-3 pr-4">Department</th><th className="py-3 pr-4">Actions</th></tr></thead><tbody>{filtered.map((employee) => <tr key={employee.id} className="border-b last:border-0"><td className="py-3 pr-4">{employee.employeeId}</td><td className="py-3 pr-4">{employee.name}</td><td className="py-3 pr-4">{employee.email}</td><td className="py-3 pr-4">{employee.department}</td><td className="py-3 pr-4"><div className="flex gap-2"><Button className="bg-slate-100 text-slate-900 hover:bg-slate-200" onClick={() => setEditing(employee)}>Edit</Button><Button className="bg-red-600 hover:bg-red-700" onClick={() => remove(employee)}>Delete</Button></div></td></tr>)}</tbody></table></div></Card></div>;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
