"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "⌁" },
  { href: "/employees", label: "Employees", icon: "👥" },
  { href: "/attendance", label: "Attendance", icon: "✓" },
  { href: "/reports", label: "Reports", icon: "▤" },
  { href: "/analytics", label: "Analytics", icon: "◒" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/login");
  }
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-slate-200 bg-white p-4 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="mb-8 flex items-center gap-3 px-2">
<<<<<<< HEAD
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">
            A
          </div>
          <div>
            <p className="font-bold">Attendance Admin</p>
            <p className="text-xs text-slate-500">HR operations panel</p>
          </div>
=======
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white">A</div>
          <div><p className="font-bold">Attendance Admin</p><p className="text-xs text-slate-500">HR operations panel</p></div>
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
<<<<<<< HEAD
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100",
                  active && "bg-slate-950 text-white hover:bg-slate-950",
                )}
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <span aria-hidden>⇥</span> Logout
        </button>
=======
            return <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100", active && "bg-slate-950 text-white hover:bg-slate-950")}><span aria-hidden>{item.icon}</span>{item.label}</Link>;
          })}
        </nav>
        <button onClick={logout} className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"><span aria-hidden>⇥</span> Logout</button>
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
      </aside>
      <main className="p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
