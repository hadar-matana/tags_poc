import { TreeOfValuesContext } from "@/store/tree-of-values-context";
import { trpc } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { TableEntity } from "@zohan/api/types/tree-api-types";
import { Card } from "@zohan/ui/components/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@zohan/ui/components/tooltip";
import { config } from "../../config";
import { useContext } from "react";
import { center } from "@turf/turf";
import { toast } from "sonner";
import type { Polygon } from "geojson";

interface ViewedTableEntity {
  key: string;
  name: string;
  imageId: string;
  polygon: Polygon;
  [key: string]: string | Polygon;
}

export const EntitiesGrid = () => {
    const { selectedEssence } = useContext(TreeOfValuesContext);
    
    const entitiesGridQuery = useQuery(
      trpc.treeEntities.getAllTableEntities.queryOptions({
        table_id: config.treeTableId,
        filter: selectedEssence
      })
    );

    const mutation = useMutation(trpc.coordConverter.ground2Image.mutationOptions({}));

    const getPropDisplayFields = (ent: TableEntity) => {
      return config.propertiesSelectedFields.reduce((acc, field) => {
        return {...acc, [field]: ent.properties_list[field]}
      }, {});
    }

    const entities: Array<ViewedTableEntity> | undefined = entitiesGridQuery?.data?.map((ent) => {
      return {
        key: ent.exclusive_id.entity_id,
        name: ent.properties_list["name"],
        imageId: ent.properties_list[config.imageFieldName],
        thumbnail: ent.properties_list.thumbnail,
        polygon: ent.geo?.geo_json,
        ...getPropDisplayFields(ent),
      }
    });

    const onCardClicked = async (entity: ViewedTableEntity) => {
      const centerPoint = center(entity.polygon).geometry.coordinates;
      const convertedPoint = await mutation.mutateAsync({imageId: entity.imageId, lon: centerPoint[0], lat: centerPoint[1]});
      const destLink = `${config.destLinkPrefix}${entity.imageId}&${config.destLinkXName}=${convertedPoint.coordinates[0][0]}&${config.destLinkYName}=${convertedPoint.coordinates[0][1]}`;
      await navigator.clipboard.writeText(destLink);
      toast.success("Image link copied to clipboard!");
    }
   
    return (
      <div className="w-full h-full p-4">
        <div
          className="grid h-full overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {entities?.map((entity) => (
            <Card onClick={() => onCardClicked(entity)}
              key={ entity.key }
              className="min-w-[180px] bg-purple-100 border border-purple-300 rounded-lg flex flex-col justify-end shadow-none cursor-pointer"
            >
              <div className="min-w-[180px] h-[180px]">
                <img src={String(entity?.thumbnail)} alt='image not found'/>
              </div>
              <div className="bg-purple-200 border-t border-purple-300 rounded-b-lg px-2 py-2 flex flex-col items-end">
                <span className="font-bold text-black w-full text-md leading-tight">{entity.name}</span>
                <TooltipProvider>
                  {config.propertiesSelectedFields.map(field => (
                    <Tooltip key={field}>
                      <TooltipTrigger asChild>
                        <span
                          className="text-xs text-black w-full block text-right overflow-hidden line-clamp-2"
                        >
                          {typeof entity[field] === "string" ? entity[field] : ""}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white">
                        {typeof entity[field] === "string" ? entity[field] : ""}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
};
