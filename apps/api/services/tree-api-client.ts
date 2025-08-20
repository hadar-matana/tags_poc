import type { 
  TreeOfValuesResponse, 
  TableEntitiesResponse, 
  TreeOfValuesParams, 
  TableEntitiesParams, 
  TableEntity 
} from '../types/tree-api-types';
import { treeEntitiesConfig, treeEntitiesEndpoints } from '../config/tree-entities';

export class TreeApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || treeEntitiesConfig.baseUrl).replace(/\/$/, '');
  }

  private async makeRequest<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), treeEntitiesConfig.timeout);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  async getTreeOfValues(params: TreeOfValuesParams): Promise<TreeOfValuesResponse> {
    const { table_id, field_id } = params;
    const endpoint = treeEntitiesEndpoints.treeOfValues(table_id, field_id);
    const url = `${this.baseUrl}${endpoint}`;

    return this.makeRequest<TreeOfValuesResponse>(url);
  }

  async getTableEntities(params: TableEntitiesParams): Promise<TableEntitiesResponse> {
    const { 
      table_id, 
      from = 1, 
      to = treeEntitiesConfig.defaultPageSize, 
      sort_by = treeEntitiesConfig.defaultSortBy 
    } = params;
    
    const endpoint = treeEntitiesEndpoints.tableEntities(table_id, from, to, sort_by);
    const url = `${this.baseUrl}${endpoint}`;

    return this.makeRequest<TableEntitiesResponse>(url);
  }

  async getAllTableEntities(
    table_id: string,
    pageSize: number = treeEntitiesConfig.defaultPageSize,
    sort_by: string = treeEntitiesConfig.defaultSortBy
  ): Promise<TableEntity[]> {
    let allEntities: TableEntity[] = [];
    let from = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getTableEntities({
        table_id,
        from,
        to: from + pageSize - 1,
        sort_by,
      });

      allEntities = allEntities.concat(response.entities_list);

      if (response.entities_list.length < pageSize || !response.nextPage) {
        hasMore = false;
      } else {
        from += pageSize;
      }
    }

    return allEntities;
  }
}
