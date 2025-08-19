import { publicProcedure, router } from '../init';
import { TreeEntitiesClient } from '../../services/tree-entities-client';
import type { TreeOfValuesResponse, TableEntitiesResponse } from '../../types/tree-api-types';
import {
  getTreeOfValuesSchema,
  getTableEntitiesSchema,
  getAllTableEntitiesSchema,
} from './tree-api-schemas';

const treeEntitiesClient = new TreeEntitiesClient();

export const treeEntitiesRouter = router({
  getTreeOfValues: publicProcedure
    .input(getTreeOfValuesSchema)
    .query(async ({ input }): Promise<TreeOfValuesResponse> => {
      return await treeEntitiesClient.getTreeOfValues(input);
    }),

  getTableEntities: publicProcedure
    .input(getTableEntitiesSchema)
    .query(async ({ input }): Promise<TableEntitiesResponse> => {
      return await treeEntitiesClient.getTableEntities(input);
    }),

  getAllTableEntities: publicProcedure
    .input(getAllTableEntitiesSchema)
    .query(async ({ input }) => {
      return await treeEntitiesClient.getTableEntitiesWithPagination(
        input.table_id,
        input.pageSize,
        input.sort_by
      );
    }),
});
