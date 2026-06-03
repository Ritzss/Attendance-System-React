import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

<<<<<<< HEAD
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100",
        className,
      )}
      {...props}
    />
  );
=======
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100", className)} {...props} />;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
