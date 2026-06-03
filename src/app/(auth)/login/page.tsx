"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (!String(data.email ?? "").includes("@") || !data.password)
      return toast.error("Enter a valid email and password.");
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (!response.ok) return toast.error("Invalid admin credentials.");
    toast.success("Welcome back");
    router.push("/dashboard");
  }
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#e2e8f0,transparent_40%),#f8fafc] p-6">
      <Card className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Admin only
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Sign in to Attendance Admin
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Protected HR dashboard for employee, attendance, reports, analytics,
            and settings management.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-medium">
            Email
            <Input
              name="email"
              type="email"
              className="mt-2"
              placeholder="admin@example.com"
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <Input
              name="password"
              type="password"
              className="mt-2"
              placeholder="••••••••"
            />
          </label>
          <Button disabled={loading} className="w-full">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
