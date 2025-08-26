import env from '../env';

export interface TreeApiConfig {
  baseUrl: string;
  timeout: number;
  defaultPageSize: number;
  defaultSortBy: string;
  useTrpcImageUrls: boolean;
}

export interface ImageServiceConfig {
  baseUrl: string;
  timeout: number;
}

export interface ApiConfig {
  treeEntities: TreeApiConfig;
  imageService: ImageServiceConfig;
}

export const treeEntitiesConfig: TreeApiConfig = {
  baseUrl: env.TREE_ENTITIES_API_BASE_URL!,
  timeout: parseInt(env.TREE_ENTITIES_API_TIMEOUT!, 10),
  defaultPageSize: parseInt(env.TREE_ENTITIES_DEFAULT_PAGE_SIZE!, 10),
  defaultSortBy: env.TREE_ENTITIES_DEFAULT_SORT_BY!,
  useTrpcImageUrls: env.USE_TRPC_IMAGE_URLS === 'true',
};

export const imageServiceConfig: ImageServiceConfig = {
  baseUrl: env.IMAGE_SERVICE_BASE_URL!,
  timeout: 10000,
};

export const apiConfig: ApiConfig = {
  treeEntities: treeEntitiesConfig,
  imageService: imageServiceConfig,
};

// TREE API Endpoints
export const treeEntitiesEndpoints = {
  treeOfValues: (tableId: string, fieldId: string) => 
    `/v2.0/Tree/TreeOfValues/${tableId}/${fieldId}`,
  
  tableEntities: (tableId: string, from: number, to: number, sortBy: string) => 
    `/v3.0/Tree/${tableId}/TableEntities?from=${from}&to=${to}&sort_by=${sortBy}`,
} as const;
