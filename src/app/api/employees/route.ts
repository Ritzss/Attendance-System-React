import { NextResponse } from "next/server";
<<<<<<< HEAD
import { requireAdmin } from "@/backend/services/auth";
=======
import { requireAdminRequest } from "@/backend/middleware/require-admin-request";
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
import { readDb } from "@/backend/services/database";
import { createEmployee } from "@/backend/services/employees";
import { employeeCreateSchema } from "@/backend/utils/validation";

export async function GET(request: Request) {
<<<<<<< HEAD
  await requireAdmin();
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const department = searchParams.get("department") ?? "";
  const db = await readDb();
  const employees = db.users.filter((employee) => {
<<<<<<< HEAD
    const matchesQuery = [
      employee.name,
      employee.email,
      employee.employeeId,
    ].some((field) => field.toLowerCase().includes(query));
=======
    const matchesQuery = [employee.name, employee.email, employee.employeeId].some((field) => field.toLowerCase().includes(query));
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
    const matchesDepartment = !department || employee.department === department;
    return matchesQuery && matchesDepartment;
  });
  return NextResponse.json({ employees });
}

export async function POST(request: Request) {
<<<<<<< HEAD
  await requireAdmin();
  const parsed = employeeCreateSchema.safeParse(await request.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
=======
  const auth = await requireAdminRequest();
  if (auth.response) return auth.response;
  const parsed = employeeCreateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  try {
    const result = await createEmployee(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
<<<<<<< HEAD
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create employee",
      },
      { status: 400 },
    );
=======
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create employee" }, { status: 400 });
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
  }
}
