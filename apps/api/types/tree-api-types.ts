// Tree Entities API Types

export interface ExclusiveId {
  dataStore: string;
  tableId: string;
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
  treeOfValues: TreeOfValuesNode[];
}

// Table Entities API Types

export interface GeoJsonGeometry {
  type: string;
  coordinates: string;
  geometries?: GeoJsonGeometry[];
}

export interface GeoJson {
  type: string;
  coordinates: string;
  geometries: GeoJsonGeometry[];
}

export interface Geo {
  wkt: string;
  geoJson: GeoJson;
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
  exclusiveId: ExclusiveId;
  link: string;
  geo: Geo;
  classification: Classification;
  date: string;
  properties: EntityProperties;
}

export interface TableEntitiesResponse {
  entities_list: TableEntity[];
}

// Request Parameters Types

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

export interface GetAllTableEntitiesParamsInput {
  table_id: string;
  pageSize?: number;
  sort_by?: string;
  filter: string;
}
