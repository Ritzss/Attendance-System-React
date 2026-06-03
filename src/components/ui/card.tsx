import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
<<<<<<< HEAD
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
=======
  return <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)} {...props} />;
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
}
