import { promises as fs } from "fs";
import path from "path";
import type { Database } from "@/types";

const dbPath = path.join(process.cwd(), "src", "backend", "db.json");

export async function readDb(): Promise<Database> {
  const content = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(content) as Database;
}

export async function writeDb(data: Database) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}
