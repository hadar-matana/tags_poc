import env from '../env';

export interface TreeApiConfig {
  baseUrl: string;
  treeSchemaName: string;
  timeout: number;
  defaultPageSize: number;
  defaultSortBy: string;
  reqTableEntitiesFilterTemplate: string;
  useTrpcImageUrls: boolean;
  requiredProperties: string[];
  customHeaders: Record<string, string> | undefined
}

export interface ImageServiceConfig {
  baseUrl: string;
  timeout: number;
}

export interface CoordConverterConfig {
  ground2ImagePath: string;
  lonParamName: string;
  latParamName: string;
}

export interface ApiConfig {
  treeEntities: TreeApiConfig;
  imageService: ImageServiceConfig;
  coordConverter: CoordConverterConfig;
}

export const treeEntitiesConfig: TreeApiConfig = {
  baseUrl: env.TREE_ENTITIES_API_BASE_URL!,
  treeSchemaName: env.TREE_SCHEMA_NAME,
  timeout: parseInt(env.TREE_ENTITIES_API_TIMEOUT!, 10),
  defaultPageSize: parseInt(env.TREE_ENTITIES_DEFAULT_PAGE_SIZE!, 10),
  defaultSortBy: env.TREE_ENTITIES_DEFAULT_SORT_BY!,
  reqTableEntitiesFilterTemplate: env.TREE_TABLE_ENTITIES_REQ_FILTER_TEMPLATE,
  useTrpcImageUrls: env.USE_TRPC_IMAGE_URLS === 'true',
  requiredProperties: env.REQUIRED_PROPERTIES!,
  customHeaders: env.TREE_CUSTOM_HEADERS
};

export const imageServiceConfig: ImageServiceConfig = {
  baseUrl: env.IMAGE_SERVICE_BASE_URL!,
  timeout: 10000,
};

export const coordConverterConfig: CoordConverterConfig = {
  ground2ImagePath: env.COORD_CONV_GROUND_2_IMAGE_PATH || 'coordConverter/ground2Image?imageId=',
  lonParamName: env.COORD_CONV_LON_NAME || "lon",
  latParamName: env.COORD_CONV_LAT_NAME || "lat",
}

export const apiConfig: ApiConfig = {
  treeEntities: treeEntitiesConfig,
  imageService: imageServiceConfig,
  coordConverter: coordConverterConfig,
};

// TREE API Endpoints
export const treeEntitiesEndpoints = {
  treeOfValues: (tableId: string, fieldId: string) => 
    `/v2.0/${treeEntitiesConfig.treeSchemaName}/TreeOfValues/${tableId}/${fieldId}`,
  
  tableEntities: (tableId: string, from: number, to: number, sortBy: string) => 
    `/v3.0/${treeEntitiesConfig.treeSchemaName}/${tableId}/TableEntities?from=${from}&to=${to}&sort_by=${sortBy}`,
} as const;

export const coordConverterEndpoints = {
  ground2Image: (imageId: string, lon: number, lat: number) => 
    `${coordConverterConfig.ground2ImagePath}${imageId}&${coordConverterConfig.lonParamName}=${lon}&${coordConverterConfig.latParamName}=${lat}`
};
