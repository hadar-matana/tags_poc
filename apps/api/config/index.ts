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

export interface ClientConfig {
  imageServiceBase: string;
  imageFieldName: string;
  entityNameProperty: string;
  entityHeaderProperty: string;
  propertiesSelectedFields: Array<string>;
  propertyLabels: Record<string, string>;
  destLinkPrefix: string;
  destLinkXName: string;
  destLinkYName: string;
  treeTableId: string;
  treeTableField: string;
  wantedEssenceRoot: string;
  wantedEssenceNode: string;
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

export const clientConfig: ClientConfig = {
  imageServiceBase: env.CLIENT_IMAGE_SERVICE_BASE_URL,
  imageFieldName: env.CLIENT_IMAGE_FIELD_NAME,
  entityNameProperty: env.CLIENT_ENTITY_NAME_PROPERTY,
  entityHeaderProperty: env.CLIENT_ENTITY_HEADER_PROPERTY,
  propertiesSelectedFields: env.CLIENT_PROPERTIES_SELECTED_FIELDS,
  propertyLabels: env.CLIENT_PROPERTY_LABELS,
  destLinkPrefix: env.CLIENT_DEST_LINK_PREFIX,
  destLinkXName: env.CLIENT_DEST_LINK_X_NAME,
  destLinkYName: env.CLIENT_DEST_LINK_Y_NAME,
  treeTableId: env.CLIENT_TABLE_ID,
  treeTableField: env.CLIENT_TABLE_FIELD,
  wantedEssenceRoot: env.CLIENT_WANTED_ESSENCE_ROOT,
  wantedEssenceNode: env.CLIENT_WANTED_ESSENCE_NODE
}

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
