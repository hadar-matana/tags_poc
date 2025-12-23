import type { GeoJsonObject } from "geojson";

 //Tree Entities API Types

export interface ExclusiveId {
  dataStore: string;
  tableId: string;
  entity_id: string;
}

export interface TreeOfValuesNode {
  name: string;
  children?: TreeOfValuesNode[];
}

export interface TreeOfValuesResponse {
  exclusiveId: ExclusiveId;
  type: string;
  name: string;
  displayName: string;
  tree_of_values: TreeOfValuesNode[];
}

 //Table Entities API Types

export interface Geo {
  wkt: string;
  geo_json: GeoJsonObject;
}

export interface Classification {
  triangle: string;
  clearance_level: number;
  publish_procedure: string;
}

export interface EntityProperties {
  [key: string]: string;
}

export interface TableEntity {
  exclusive_id: ExclusiveId;
  link: string;
  geo: Geo;
  classification: Classification;
  date: string;
  properties_list: EntityProperties;
}

export interface TableEntitiesResponse {
  entities_list: TableEntity[];
}

 //Request Parameters Types

export interface TreeOfValuesParams {
  table_id: string;
  field_id: string;
}

export interface TableEntitiesParams {
  table_id: string;
  from?: number;
  to?: number;
  sort_by?: string;
  filter: string;
}

export interface TableEntitiesRequestBody {
  filter: any;
}
