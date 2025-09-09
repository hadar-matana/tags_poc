export const config = {
  imageFieldName: import.meta.env.VITE_IMAGE_FIELD_NAME || 'imageId',
  propertiesSelectedFields: import.meta.env.VITE_PROPERTIES_SELECTED_FIELDS || ['essence', 'description', 'status', 'category'],
  destLinkPrefix: import.meta.env.VITE_DEST_LINK_PREFIX || "http://JohnnieWalkerTheOneAndTheOnly/imageId=",
  destLinkXName: import.meta.env.VITE_DEST_LINK_X_NAME || "X",
  destLinkYName: import.meta.env.VITE_DEST_LINK_Y_NAME || "Y",
  treeTableId: import.meta.env.TABLE_ID || "users",
  treeTableField: import.meta.env.TABLE_FIELD || "type",
  wantedEssenceRoot: import.meta.env.WANTED_ESSENCE_ROOT || 'Category A - users',
  wantedEssenceNode: import.meta.env.WANTED_ESSENCE_NODE || 'Category A - users/Subcategory A'
}