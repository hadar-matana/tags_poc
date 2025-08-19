import type { TreeOfValuesResponse, TableEntitiesResponse, TreeOfValuesParams, TableEntitiesParams, TableEntity } from '../types/tree-api-types';
import { treeEntitiesConfig, treeEntitiesEndpoints, validateTreeEntitiesConfig } from '../config/tree-entities';

export class TreeEntitiesClient {
  private baseUrl: string;
  private config: typeof treeEntitiesConfig;

  constructor(baseUrl?: string) {
    // Validate configuration on client creation
    validateTreeEntitiesConfig();
    
    this.config = treeEntitiesConfig;
    this.baseUrl = (baseUrl || this.config.baseUrl).replace(/\/$/, '');
  }

  async getTreeOfValues(params: TreeOfValuesParams): Promise<TreeOfValuesResponse> {
    const { table_id, field_id } = params;
    const endpoint = treeEntitiesEndpoints.treeOfValues(table_id, field_id);
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as TreeOfValuesResponse;
    } catch (error) {
      throw new Error(`Failed to fetch tree of values: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getTableEntities(params: TableEntitiesParams): Promise<TableEntitiesResponse> {
    const { 
      table_id, 
      from = 1, 
      to = this.config.defaultPageSize, 
      sort_by = this.config.defaultSortBy 
    } = params;
    
    const endpoint = treeEntitiesEndpoints.tableEntities(table_id, from, to, sort_by);
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as TableEntitiesResponse;
    } catch (error) {
      throw new Error(`Failed to fetch table entities: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getTableEntitiesWithPagination(
    table_id: string,
    pageSize: number = this.config.defaultPageSize,
    sort_by: string = this.config.defaultSortBy
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

export const createTreeEntitiesClient = (baseUrl?: string): TreeEntitiesClient => {
  return new TreeEntitiesClient(baseUrl);
};
