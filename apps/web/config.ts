export const config = {
  imageFieldName: import.meta.env.VITE_IMAGE_FIELD_NAME || 'imageId',
  propertiesSelectedFields: import.meta.env.VITE_PROPERTIES_SELECTED_FIELDS || ['essence', 'description', 'status', 'category'],
  destLinkPrefix: import.meta.env.VITE_DEST_LINK_PREFIX || "http://JohnnieWalkerTheOneAndTheOnly/imageId=",
  destLinkXName: import.meta.env.VITE_DEST_LINK_X_NAME || "X",
  destLinkYName: import.meta.env.VITE_DEST_LINK_Y_NAME || "Y",
}