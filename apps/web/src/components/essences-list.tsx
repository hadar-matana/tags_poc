import { Card } from "@zohan/ui/components/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@zohan/ui/components/tooltip";
import { trpc } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { TreeOfValuesContext } from "@/store/tree-of-values-context";
import type { TreeOfValuesNode } from "@zohan/api/types/tree-api-types";
import { config } from "../../config";

export const EssencesList = () => {
  const { selectedEssence, setSelectedEssence } = useContext(TreeOfValuesContext);
  const treeOfValuesQuery = useQuery(
    trpc.treeEntities.getTreeOfValues.queryOptions({ table_id: config.treeTableId, field_id: config.treeTableField })
  );
  
  function flattenTree(tree: TreeOfValuesNode, parentPath = ""): string[] {
    let result: string[] = [];
    let currentPath = parentPath ? `${parentPath}\/${tree.name}` : tree.name;
    result = [currentPath];
    
    if (tree.children && tree.children.length > 0) {
      for (const child of tree.children) {
        result = result.concat(flattenTree(child, currentPath));
      }
    }
    return result;
  }
  
  let essences: string[] = [];
  if (treeOfValuesQuery.data?.tree_of_values?.[0]) {
    treeOfValuesQuery.data?.tree_of_values.forEach(parentTreeNode => {
      essences = essences.concat(flattenTree(parentTreeNode))
    });
  }
  
  essences = essences.filter(essence => essence === config.wantedEssenceRoot || essence.includes(config.wantedEssenceNode));
  
  return (
    <div className="w-[30%] p-4 bg-white border rounded-lg flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-2 h-full overflow-y-auto">
        <TooltipProvider>
          {essences.map((essence) => (
            <Tooltip key={essence}>
              <TooltipTrigger asChild>
                <Card
                  className={`cursor-pointer bg-purple-100 px-4 border rounded-md flex items-center ${
                    selectedEssence === essence ? "border-purple-400" : ""
                  }`}
                  style={{ height: "32px" }}
                  onClick={() => setSelectedEssence(essence)}
                >
                  <span
                    className={`text-purple-400 w-full text-right ${selectedEssence === essence ? "font-bold" : ""}`}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block"
                    }}
                  >
                    {essence}
                  </span>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white">
                {essence}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};