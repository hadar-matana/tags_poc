import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve('.env') });


export interface TreeApiConfig {
  baseUrl: string;
  timeout: number;
  defaultPageSize: number;
  defaultSortBy: string;
}

export const treeEntitiesConfig: TreeApiConfig = {
  baseUrl: process.env.TREE_ENTITIES_API_BASE_URL!,
  timeout: parseInt(process.env.TREE_ENTITIES_API_TIMEOUT!, 10),
  defaultPageSize: parseInt(process.env.TREE_ENTITIES_DEFAULT_PAGE_SIZE!, 10),
  defaultSortBy: process.env.TREE_ENTITIES_DEFAULT_SORT_BY!,
};

// API Endpoints
export const treeEntitiesEndpoints = {
  treeOfValues: (tableId: string, fieldId: string) => 
    `/v2.0/Tree/TreeOfValues/${tableId}/${fieldId}`,
  
  tableEntities: (tableId: string, from: number, to: number, sortBy: string) => 
    `/v3.0/Tree/${tableId}/TableEntities?from=${from}&to=${to}&sort_by=${sortBy}`,
} as const;


