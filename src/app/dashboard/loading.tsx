import { Skeleton } from "@/components/ui/skeleton";
<<<<<<< HEAD
export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-80" />
    </div>
  );
}
=======
export default function Loading() { return <div className="space-y-6"><Skeleton className="h-10 w-64" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-32" />)}</div><Skeleton className="h-80" /></div>; }
>>>>>>> cc7865a7ae87dfe2944893f78604a8487b6d10fe
