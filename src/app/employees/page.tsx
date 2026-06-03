<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb } from "@/backend/services/database";
import { EmployeeManager } from "@/components/employees/employee-manager";

export default async function EmployeesPage() {
<<<<<<< HEAD
  await requireAdmin();
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
=======
  const db = await readDb();
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Employee management</h1><p className="text-slate-500">Create employees, generate app credentials, search, filter, edit, and delete records.</p></div><EmployeeManager initialEmployees={db.users} /></div>;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
