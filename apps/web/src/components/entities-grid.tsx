import { TreeOfValuesContext } from "@/store/tree-of-values-context";
import { trpc } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { TableEntity } from "@zohan/api/types/tree-api-types";
import { Card } from "@zohan/ui/components/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@zohan/ui/components/tooltip";
import { useContext } from "react";
import { center } from "@turf/turf";
import { toast } from "sonner";
import type { Polygon } from "geojson";
import { EntitiesGridSkeleton } from "./entities-grid-skeleton";
import { getPolygonCenter } from "@/lib/detect-pixel-centroied";
import { useConfigContext } from "@/contexts/config-context";

interface ViewedTableEntity {
  key: string;
  name: string;
  imageId: string;
  polygon: Polygon;
  thumbnail: string;
  center_pixel: {x: number, y: number} | undefined;
  [key: string]: string | Polygon | {x: number, y: number} | undefined;
}

export const EntitiesGrid = () => {
    const { selectedEssence } = useContext(TreeOfValuesContext);
    const config = useConfigContext().appConfig;

    const entitiesGridQuery = useQuery({
      ...trpc.treeEntities.getAllTableEntities.queryOptions({
        table_id: config.treeTableId,
        filter: selectedEssence
      }),
      enabled: !!selectedEssence
    });
  
    const mutation = useMutation(trpc.coordConverter.ground2Image.mutationOptions({}));

    if (entitiesGridQuery.isLoading || entitiesGridQuery.isFetching) {
      return <EntitiesGridSkeleton />;
    }

    const getPropDisplayFields = (ent: TableEntity) => {
      return config.propertiesSelectedFields.reduce((acc: Record<string, any>, field: string) => {
        return {...acc, [field]: ent.properties_list[field]}
      }, {});
    }

    const entities: Array<ViewedTableEntity> | undefined = entitiesGridQuery?.data?.map((ent) => {
      return {
        key: ent.exclusive_id.entity_id,
        name: ent.properties_list[config.entityNameProperty],
        imageId: ent.properties_list[config.imageFieldName],
        thumbnail: ent.properties_list.thumbnail,
        center_pixel: ent.properties_list?.pixel_vector ? getPolygonCenter(ent.properties_list.pixel_vector) : undefined,
        polygon: ent.geo?.geo_json as Polygon,
        ...getPropDisplayFields(ent),
      }
    });

    const onCardClicked = async (entity: ViewedTableEntity) => {
      try {
        let destLinkX;
        let destLinkY;

        if (entity.center_pixel) {
          destLinkX = entity.center_pixel.x;
          destLinkY = entity.center_pixel.y;
        } else {
          const centerPoint = center(entity.polygon).geometry.coordinates;
          const convertedPoint = await mutation.mutateAsync({imageId: entity.imageId, lon: centerPoint[0], lat: centerPoint[1]});
          destLinkX = convertedPoint.coordinates[0][0];
          destLinkY = convertedPoint.coordinates[0][1];
        }

        const destLink = `${config.destLinkPrefix}${entity.imageId}&${config.destLinkXName}=${destLinkX}&${config.destLinkYName}=${destLinkY}`;
        await navigator.clipboard.writeText(destLink);
        toast.success("הקישור הועתק בהצלחה!");
      } catch (error) {
        console.error("העתקת הקישור נכשלה: ", error);
        toast.error("העתקת הקישור נכשלה. נסה שנית.");
      }
    }
   
    if (!selectedEssence) {
      return (
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-600 mb-2">
              בחר מהות לסינון
            </div>
            <div className="text-sm text-gray-500">
              בחר מהות מהרשימה המוצגת לסינון הישויות
            </div>
          </div>
        </div>
      );
    }

    if (!entities || entities.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-600 mb-2">
              לא נמצאו ישויות
            </div>
            <div className="text-sm text-gray-500">
              לא נמצאו ישויות מתאימות למהות שנבחרה
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full p-4">
        <div
          className="grid h-full overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {entities?.map((entity) => (
            <Card onClick={() => onCardClicked(entity)}
              key={ entity.key }
              className="w-[15.675vw] h-[calc(15.625vw_+_97px)] bg-purple-100 border border-purple-300 rounded-lg flex flex-col justify-end shadow-none cursor-pointer"
            >
              <div className="w-[15.625vw] h-[15.625vw]">
                <img src={String(entity?.thumbnail)} alt='image not found'/>
              </div>
              <div className="bg-purple-200 border-t border-purple-300 rounded-b-lg px-2 py-2 flex flex-col items-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs text-black w-full block flex text-right">
                        <span className="font-bold ml-1">{config.propertyLabels[config.entityHeaderProperty]}:</span>
                        <span className="font-bold ml-1 overflow-hidden line-clamp-2 whitespace-nowrap overflow-hidden text-ellipsis">
                          {entity[config.entityHeaderProperty] ? String(entity[config.entityHeaderProperty]) : ""}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                      <div>
                        <div className="font-semibold">{config.propertyLabels[config.entityHeaderProperty]}:</div>
                        <div>{entity[config.entityHeaderProperty] ? String(entity[config.entityHeaderProperty]) : ""}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  {config.propertiesSelectedFields.filter((f: string) => f !== config.entityHeaderProperty).map((field: string) => (
                    <Tooltip key={field}>
                      <TooltipTrigger asChild>
                        <div className="text-xs text-black w-full flex block text-right">
                          <span className="ml-1">{config.propertyLabels[field]}:</span>
                          <span className="ml-1 overflow-hidden line-clamp-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            {typeof entity?.[field] === "string" ? entity[field] : ""}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white">
                        <div>
                          <div className="font-semibold">{config.propertyLabels[field]}:</div>
                          <div>{typeof entity?.[field] === "string" ? entity[field] : ""}</div>
                        </div>
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
