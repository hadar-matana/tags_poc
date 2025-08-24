import { publicProcedure, router } from '../init';
import { TreeApiClient } from '../../services/tree-api-client';
import type { TreeOfValuesResponse, TableEntity } from '../../types/tree-api-types';
import {
  getTreeOfValuesSchema,
  getAllTableEntitiesSchema,
  getTableEntitiesSchema,
} from './tree-api-validation-schemas';

const treeApiClient = new TreeApiClient();

export const treeEntitiesRouter = router({
  getTreeOfValues: publicProcedure
    .input(getTreeOfValuesSchema)
    .query(async ({ input }): Promise<TreeOfValuesResponse> => {
      return await treeApiClient.getTreeOfValues(input);
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
      return await treeApiClient.getAllTableEntities(input);
    }),
});
