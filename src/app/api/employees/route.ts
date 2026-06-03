import { NextResponse } from "next/server";
import { requireAdmin } from "@/backend/services/auth";
import { readDb } from "@/backend/services/database";
import { createEmployee } from "@/backend/services/employees";
import { employeeCreateSchema } from "@/backend/utils/validation";

export async function GET(request: Request) {
  await requireAdmin();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const department = searchParams.get("department") ?? "";
  const db = await readDb();
  const employees = db.users.filter((employee) => {
    const matchesQuery = [employee.name, employee.email, employee.employeeId].some((field) => field.toLowerCase().includes(query));
    const matchesDepartment = !department || employee.department === department;
    return matchesQuery && matchesDepartment;
  });
  return NextResponse.json({ employees });
}

export async function POST(request: Request) {
  await requireAdmin();
  const parsed = employeeCreateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data" }, { status: 400 });
  try {
    const result = await createEmployee(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create employee" }, { status: 400 });
  }
}
