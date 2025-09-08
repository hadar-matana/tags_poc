export const config = {
  imageFieldName: import.meta.env.VITE_IMAGE_FIELD_NAME,
  entityNameProperty: import.meta.env.VITE_ENTITY_NAME_PROPERTY,
  entityHeaderProperty: import.meta.env.VITE_ENTITY_HEADER_PROPERTY,
  propertiesSelectedFields: JSON.parse(import.meta.env.VITE_PROPERTIES_SELECTED_FIELDS),
  destLinkPrefix: import.meta.env.VITE_DEST_LINK_PREFIX,
  destLinkXName: import.meta.env.VITE_DEST_LINK_X_NAME,
  destLinkYName: import.meta.env.VITE_DEST_LINK_Y_NAME,
}