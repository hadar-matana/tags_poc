// Tree Entities API Configuration

export interface TreeApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  defaultPageSize: number;
  maxPageSize: number;
  defaultSortBy: string;
}

export const treeEntitiesConfig: TreeApiConfig = {
  baseUrl: process.env.TREE_ENTITIES_API_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(process.env.TREE_ENTITIES_API_TIMEOUT || '30000', 10),
  retryAttempts: parseInt(process.env.TREE_ENTITIES_API_RETRY_ATTEMPTS || '3', 10),
  retryDelay: parseInt(process.env.TREE_ENTITIES_API_RETRY_DELAY || '1000', 10),
  defaultPageSize: parseInt(process.env.TREE_ENTITIES_DEFAULT_PAGE_SIZE || '100', 10),
  maxPageSize: parseInt(process.env.TREE_ENTITIES_MAX_PAGE_SIZE || '1000', 10),
  defaultSortBy: process.env.TREE_ENTITIES_DEFAULT_SORT_BY || 'CreationTime',
};

// API Endpoints
export const treeEntitiesEndpoints = {
  treeOfValues: (tableId: string, fieldId: string) => 
    `/v2.0/Tree/TreeOfValues/${tableId}/${fieldId}`,
  
  tableEntities: (tableId: string, from: number, to: number, sortBy: string) => 
    `/v3.0/Tree/${tableId}/TableEntities?from=${from}&to=${to}&sort_by=${sortBy}`,
} as const;

// Validation
export const validateTreeEntitiesConfig = (): void => {
  const requiredEnvVars = ['TREE_ENTITIES_API_BASE_URL'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`Warning: ${envVar} is not set, using default value`);
    }
  }
  
  if (treeEntitiesConfig.timeout < 1000) {
    throw new Error('TREE_ENTITIES_API_TIMEOUT must be at least 1000ms');
  }
  
  if (treeEntitiesConfig.retryAttempts < 0) {
    throw new Error('TREE_ENTITIES_API_RETRY_ATTEMPTS must be non-negative');
  }
  
  if (treeEntitiesConfig.defaultPageSize > treeEntitiesConfig.maxPageSize) {
    throw new Error('TREE_ENTITIES_DEFAULT_PAGE_SIZE cannot exceed TREE_ENTITIES_MAX_PAGE_SIZE');
  }
};
