const parseJsonArray = (s: string | undefined, fallback: string[]) => {
  try { return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};
const parseJsonObject = <T extends object>(s: string | undefined, fb: T) => {
  try { return s ? (JSON.parse(s) as T) : fb; } catch { return fb; }
};

export const config = {
  apiBase: import.meta.env.VITE_API_BASE_URL as string,
  imageServiceBase: import.meta.env.VITE_IMAGE_SERVICE_BASE_URL as string,

  imageFieldName: import.meta.env.VITE_IMAGE_FIELD_NAME as string,
  entityNameProperty: import.meta.env.VITE_ENTITY_NAME_PROPERTY as string,
  entityHeaderProperty: import.meta.env.VITE_ENTITY_HEADER_PROPERTY as string,

  propertiesSelectedFields: parseJsonArray(
    import.meta.env.VITE_PROPERTIES_SELECTED_FIELDS as string | undefined, []
  ),
  propertyLabels: parseJsonObject<Record<string, string>>(
    import.meta.env.VITE_PROPERTY_LABELS as string | undefined, {}
  ),

  destLinkPrefix: import.meta.env.VITE_DEST_LINK_PREFIX as string,
  destLinkXName: import.meta.env.VITE_DEST_LINK_X_NAME as string,
  destLinkYName: import.meta.env.VITE_DEST_LINK_Y_NAME as string,

  treeTableId: (import.meta.env.VITE_TABLE_ID as string) || "users",
  treeTableField: (import.meta.env.VITE_TABLE_FIELD as string) || "type",
  wantedEssenceRoot:
    (import.meta.env.VITE_WANTED_ESSENCE_ROOT as string) || "Category A - users",
  wantedEssenceNode:
    (import.meta.env.VITE_WANTED_ESSENCE_NODE as string) ||
    "Category A - users/Subcategory A",

  trpcServerPrefix: (import.meta.env.VITE_TRPC_SERVER_PREFIX as string) || "",
  dateFields: parseJsonArray(
    import.meta.env.VITE_DATE_FIELDS as string | undefined, ["photo_time"]
  ),
};
