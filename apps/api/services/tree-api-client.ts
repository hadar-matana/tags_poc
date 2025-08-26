import type { 
  TreeOfValuesResponse, 
  TableEntitiesResponse, 
  TreeOfValuesParams, 
  TableEntitiesParams, 
  TableEntity,
  TableEntitiesRequestBody
} from '../types/tree-api-types';
import type { GetAllTableEntitiesInput } from '../trpc/routers/tree-api-validation-schemas';
import { treeEntitiesConfig, treeEntitiesEndpoints } from '../config';
import { HttpClient } from './http-client';

export class TreeApiClient {
  private static instance: TreeApiClient;
  private httpClient?: HttpClient;
  private baseUrl?: string;
  private processedBaseUrl?: string;

  private constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl?: string): TreeApiClient {
    if (!TreeApiClient.instance) {
      TreeApiClient.instance = new TreeApiClient(baseUrl);
    }
    return TreeApiClient.instance;
  }

  private getHttpClient(): HttpClient {
    if (!this.httpClient) {
      this.processedBaseUrl = this.processBaseUrl(this.baseUrl);
      this.httpClient = new HttpClient(this.processedBaseUrl);
    }
    return this.httpClient;
  }

  async getTreeOfValues({ table_id, field_id }: TreeOfValuesParams): Promise<TreeOfValuesResponse> {
    const endpoint = treeEntitiesEndpoints.treeOfValues(table_id, field_id);
    return this.getHttpClient().get<TreeOfValuesResponse>(endpoint);
  }

  async getTableEntities({ 
    table_id, 
    from = 1, 
    to = treeEntitiesConfig.defaultPageSize, 
    sort_by = treeEntitiesConfig.defaultSortBy,
    filter
  }: TableEntitiesParams): Promise<TableEntitiesResponse> {
    const endpoint = treeEntitiesEndpoints.tableEntities(table_id, from, to, sort_by);
    const requestBody: TableEntitiesRequestBody = { filter };

    const response = await this.getHttpClient().post<TableEntitiesResponse>(endpoint, requestBody);

    const shouldNormalize =
      this.shouldPreferImageProxy() &&
      Array.isArray(response.entities_list) &&
      response.entities_list.some(e => e?.properties?.originalImg);

    const entities = shouldNormalize
      ? this.normalizeImageUrls(response.entities_list)
      : response.entities_list;

    return { ...response, entities_list: entities };
  }

  async getAllTableEntities({ table_id, pageSize = 100, sort_by, filter }: GetAllTableEntitiesInput): Promise<TableEntity[]> {
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

  private shouldPreferImageProxy(): boolean {
    return Boolean(treeEntitiesConfig.useTrpcImageUrls);
  }

    
  private normalizeImageUrls(entities: TableEntity[]): TableEntity[] {
    const base = this.processedBaseUrl || this.processBaseUrl(this.baseUrl);

    return entities.map(entity => {
      if (entity?.properties?.originalImg) {
        const preferredImageUrl = `${base}/api/image/${entity.exclusiveId.dataStore}/${entity.exclusiveId.tableId}`;
        return {
          ...entity,
          properties: {
            ...entity.properties,
            img: preferredImageUrl,
          },
        };
      }
      return entity;
    });
  }
}
