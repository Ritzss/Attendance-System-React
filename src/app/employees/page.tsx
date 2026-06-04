import { readDb } from "@/backend/services/database";
import { EmployeeManager } from "@/components/employees/employee-manager";

export default async function EmployeesPage() {
  const db = await readDb();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employee management</h1>
        <p className="text-slate-500">
          Create employees, generate app credentials, search, filter, edit, and
          delete records.
        </p>
      </div>
      <EmployeeManager initialEmployees={db.users} />
    </div>
  );
}
