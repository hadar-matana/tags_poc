import { publicProcedure, router } from '../init';
import { TreeApiClient } from '../../services/tree-api-client';
import type { TreeOfValuesResponse, TableEntity } from '../../types/tree-api-types';
import {
  getTreeOfValuesSchema,
  getAllTableEntitiesSchema,
} from './tree-api-validation-schemas';

const treeApiClient = new TreeApiClient();

export const treeEntitiesRouter = router({
  getTreeOfValues: publicProcedure
    .input(getTreeOfValuesSchema)
    .query(async ({ input }): Promise<TreeOfValuesResponse> => {
      return await treeApiClient.getTreeOfValues(input);
    }),

  getAllTableEntities: publicProcedure
    .input(getAllTableEntitiesSchema)
    .query(async ({ input }): Promise<TableEntity[]> => {
      return await treeApiClient.getAllTableEntities(
        input.table_id,
        input.pageSize,
        input.sort_by
      );
    }),
});
