import type { 
  TreeOfValuesResponse, 
  TableEntitiesResponse, 
  TreeOfValuesParams, 
  TableEntitiesParams, 
  TableEntity,
  GetAllTableEntitiesParamsInput,
  TableEntitiesRequestBody
} from '../types/tree-api-types';
import { treeEntitiesConfig, treeEntitiesEndpoints } from '../config/tree-entities';
import { HttpClient } from './http-client';


export class TreeApiClient {
  private static instance: TreeApiClient;
  private httpClient: HttpClient;

  private constructor(baseUrl?: string) {
    const processedBaseUrl = this.processBaseUrl(baseUrl);
    this.httpClient = new HttpClient(processedBaseUrl);
  }

  public static getInstance(baseUrl?: string): TreeApiClient {
    if (!TreeApiClient.instance) {
      TreeApiClient.instance = new TreeApiClient(baseUrl);
    }
    return TreeApiClient.instance;
  }

  async getTreeOfValues(params: TreeOfValuesParams): Promise<TreeOfValuesResponse> {
    const { table_id, field_id } = params;
    const endpoint = treeEntitiesEndpoints.treeOfValues(table_id, field_id);
    return this.httpClient.get<TreeOfValuesResponse>(endpoint);
  }

  async getTableEntities(params: TableEntitiesParams): Promise<TableEntitiesResponse> {
    const { 
      table_id, 
      from = 1, 
      to = treeEntitiesConfig.defaultPageSize, 
      sort_by = treeEntitiesConfig.defaultSortBy,
      filter
    } = params;
    
    const endpoint = treeEntitiesEndpoints.tableEntities(table_id, from, to, sort_by);

    const requestBody: TableEntitiesRequestBody = { filter };

    if (process.env.NODE_ENV === 'development') {
      console.log('TreeApiClient: NODE_ENV =', process.env.NODE_ENV);
    }

    return this.httpClient.post<TableEntitiesResponse>(endpoint, requestBody);
  }

  async getAllTableEntities(params: GetAllTableEntitiesParamsInput): Promise<TableEntity[]> {
    const { table_id, pageSize = 100, sort_by, filter } = params;

    let allEntities: TableEntity[] = [];
    let from = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getTableEntities({
        table_id,
        from,
        to: from + pageSize - 1,
        sort_by,
        filter,
      });

      allEntities = allEntities.concat(response.entities_list);

      if (response.entities_list.length < pageSize) {
        hasMore = false;
      } else {
        from += pageSize;
      }
    }

    return allEntities;
  }

  private processBaseUrl(baseUrl?: string): string {
    return (baseUrl || treeEntitiesConfig.baseUrl).replace(/\/$/, '');
  }
}