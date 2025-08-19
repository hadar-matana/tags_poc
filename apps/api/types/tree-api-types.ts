// Tree Entities API Types

export interface ExclusiveId {
  dataStore: string;
  tableId: string;
  entityId: string;
  valueListId: string;
  treeOfValuestId: string;
  sequence: number;
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
  triangleId: string;
  c1: number;
  publishProcedure: string;
}

export interface EntityProperties {
  [key: string]: string;
}

export interface TableEntity {
  exclusiveId: string;
  tableId: string;
  entityId: string;
  vlaueListId: string;
  treeOfValuestId: string;
  sequence: number;
  link: string;
  geo: Geo;
  classification: Classification;
  date: string;
  properties: EntityProperties;
}

export interface TableEntitiesResponse {
  total_entities: number;
  nextPage: string;
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
}
