import { Input } from "@zohan/ui/components/input";
import { Card } from "@zohan/ui/components/card";
import { Separator } from "@zohan/ui/components/separator";
import { useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const UsersList = () => {
  const treeOfValuesQuery = useQuery(
    trpc.treeEntities.getTreeOfValues.queryOptions({ table_id: "users", field_id: "type" })
  );
  const [treeOfValues, setTreeOfValues] = useState(treeOfValuesQuery.data?.treeOfValues[0].children || []);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (treeOfValuesQuery.data?.treeOfValues) {
      setTreeOfValues(treeOfValuesQuery.data.treeOfValues[0]?.children || []);
    }
  }, [treeOfValuesQuery.data]);

  return (
    <div className="w-[30%] p-4 bg-white border rounded-lg flex flex-col gap-2">
      <Input
        placeholder="חפש מחלקות"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />
      <Separator />
      <div className="flex flex-col gap-2">
        {treeOfValues.map((treeValue) => (
          <Card
            key={treeValue.name}
            className={`cursor-pointer bg-purple-100 px-4 border rounded-md flex items-center ${
              selected === treeValue.name ? "border-purple-400" : ""
            }`}
            style={{ height: "32px" }}
            onClick={() => setSelected(selected === treeValue.name ? null : treeValue.name)}
          >
            <span className={`text-purple-400 w-full text-right ${selected === treeValue.name ? "font-bold" : ""}`}>{treeValue.name}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};