import { Card } from "@zohan/ui/components/card";
import { Skeleton } from "@zohan/ui/components/skeleton";

export const EssencesListSkeleton = () => {
  return (
    <div className="w-[30%] p-4 bg-white border rounded-lg flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-2 h-full overflow-y-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className="cursor-pointer bg-purple-100 px-4 border rounded-md flex items-center"
            style={{ height: "32px" }}
          >
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
};
