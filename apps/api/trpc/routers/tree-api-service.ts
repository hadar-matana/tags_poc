import { publicProcedure, router } from '../init';
import { TreeApiClient } from '../../services/tree-api-client';
import { ImageApiClient } from '../../services/image-api-client';
import type { TreeOfValuesResponse, TableEntity } from '../../types/tree-api-types';
import type { ImageServiceResponse } from '../../types/image-api-types';
import {
  getTreeOfValuesSchema,
  getAllTableEntitiesSchema,
  getTableEntitiesSchema,
  getImageUrlSchema,
} from './tree-api-validation-schemas';
import { treeEntitiesConfig } from '../../config';

const treeApiClient = TreeApiClient.getInstance();
const imageApiClient = ImageApiClient.getInstance();


export const treeEntitiesRouter = router({
  getTreeOfValues: publicProcedure
    .input(getTreeOfValuesSchema)
    .query(async ({ input }): Promise<TreeOfValuesResponse> => {
      return treeApiClient.getTreeOfValues(input);
    }),

  getTableEntities: publicProcedure
    .input(getTableEntitiesSchema)
    .query(async ({ input }): Promise<TableEntity[]> => {
      console.log('tRPC getTableEntities called with input:', input);
      const response = await treeApiClient.getTableEntities(input);
      console.log('tRPC getTableEntities response entities count:', response.entities_list.length);
      return response.entities_list;
    }),

  getAllTableEntities: publicProcedure
    .input(getAllTableEntitiesSchema)
    .query(async ({ input }): Promise<TableEntity[]> => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const entities = await treeApiClient.getAllTableEntities(input);
      // Filter entities that have all required properties (only if requiredProperties is defined and not empty)
      const filteredEntities = treeEntitiesConfig.requiredProperties && treeEntitiesConfig.requiredProperties.length > 0
        ? entities.filter(entity => {
            const hasAllRequiredProperties = treeEntitiesConfig.requiredProperties.every(
              propertyName => entity.properties && entity.properties[propertyName] !== undefined && entity.properties[propertyName] !== null
            );
            return hasAllRequiredProperties;
          })
        : entities;      
      return filteredEntities;
    }),

  getImageUrl: publicProcedure
    .input(getImageUrlSchema)
    .query(async ({ input }): Promise<ImageServiceResponse> => {
      console.log('tRPC getImageUrl called with exclusiveId:', input.exclusiveId);
      return imageApiClient.getImageUrl(input.exclusiveId);
    }),
});
