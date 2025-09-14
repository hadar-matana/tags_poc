export const config = {
  imageFieldName: import.meta.env.VITE_IMAGE_FIELD_NAME,
  entityNameProperty: import.meta.env.VITE_ENTITY_NAME_PROPERTY,
  entityHeaderProperty: import.meta.env.VITE_ENTITY_HEADER_PROPERTY,
  propertiesSelectedFields: JSON.parse(import.meta.env.VITE_PROPERTIES_SELECTED_FIELDS),
  propertyLabels: JSON.parse(import.meta.env.VITE_PROPERTY_LABELS),
  destLinkPrefix: import.meta.env.VITE_DEST_LINK_PREFIX,
  destLinkXName: import.meta.env.VITE_DEST_LINK_X_NAME,
  destLinkYName: import.meta.env.VITE_DEST_LINK_Y_NAME,
  treeTableId: import.meta.env.VITE_TABLE_ID || "users",
  treeTableField: import.meta.env.VITE_TABLE_FIELD || "type",
  wantedEssenceRoot: import.meta.env.VITE_WANTED_ESSENCE_ROOT || 'Category A - users',
  wantedEssenceNode: import.meta.env.VITE_WANTED_ESSENCE_NODE || 'Category A - users/Subcategory A',
  trpcServerPrefix: import.meta.env.VITE_TRPC_SERVER_PREFIX || ''
}