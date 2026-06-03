import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import type { Employee } from "@/types";
import { readDb, writeDb } from "./database";

export function generateEmployeeId(existing: Employee[]) {
  const next = existing.length + 1;
  return `EMP-${String(next).padStart(4, "0")}`;
}

export function generatePassword() {
  return (
    Math.random().toString(36).slice(2, 6).toUpperCase() +
    Math.random().toString(36).slice(2, 8)
  );
}

export async function createEmployee(input: {
  name: string;
  email: string;
  department: string;
  sendEmail?: boolean;
}) {
  const db = await readDb();
  if (
    db.users.some(
      (user) => user.email.toLowerCase() === input.email.toLowerCase(),
    )
  ) {
    throw new Error("An employee with this email already exists.");
  }
  const plainPassword = generatePassword();
  const employee: Employee = {
    id: randomUUID(),
    employeeId: generateEmployeeId(db.users),
    name: input.name,
    email: input.email,
    department: input.department,
    role: "employee",
    passwordHash: await bcrypt.hash(plainPassword, 10),
    createdAt: new Date().toISOString(),
  };
  db.users.push(employee);
  await writeDb(db);
  if (input.sendEmail) await sendCredentials(employee, plainPassword);
  return { employee, plainPassword };
}

async function sendCredentials(employee: Employee, password: string) {
  if (!process.env.SMTP_HOST) return;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Attendance Admin <no-reply@example.com>",
    to: employee.email,
    subject: "Your attendance app credentials",
    text: `Employee ID: ${employee.employeeId}\nPassword: ${password}`,
  });
}
