import { Card } from "@zohan/ui/components/card";
import { Skeleton } from "@zohan/ui/components/skeleton";

export const EntitiesGridSkeleton = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="grid h-full overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card
            key={index}
            className="min-w-[180px] bg-purple-100 border border-purple-300 rounded-lg flex flex-col justify-end shadow-none"
          >
            <Skeleton className="min-w-[180px] h-[180px] rounded-t-lg" />
            <div className="bg-purple-200 border-t border-purple-300 rounded-b-lg px-2 py-2 flex flex-col items-end">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-2/3 mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
