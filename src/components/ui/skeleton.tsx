import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-800", className)}
      {...props}
    />
  );
}

export function ToolCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-lg p-6 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="flex items-start space-x-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-[80%] mt-2" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <div className="flex gap-3 mt-4">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
      </div>
    </div>
  );
}

export { Skeleton };