import 'dotenv/config';
import { z } from 'zod';

const serverEnvSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TREE_ENTITIES_API_BASE_URL: z.string(),
  TREE_SCHEMA_NAME: z.string(),
  TREE_ENTITIES_API_TIMEOUT: z.string(),
  TREE_ENTITIES_DEFAULT_PAGE_SIZE: z.string(),
  TREE_ENTITIES_DEFAULT_SORT_BY: z.string(),
  TREE_TABLE_ENTITIES_REQ_FILTER_TEMPLATE: z.string(),
  TREE_CUSTOM_HEADERS: z
    .string()
    .transform(val => JSON.parse(val))
    .optional(),
  USE_TRPC_IMAGE_URLS: z.string().optional(),
  IMAGE_SERVICE_BASE_URL: z.string(),
  COORD_CONV_GROUND_2_IMAGE_PATH: z.string(),
  COORD_CONV_LON_NAME: z.string(),
  COORD_CONV_LAT_NAME: z.string(),
  REQUIRED_PROPERTIES: z
    .string()
    .transform(str => (str ? str.split(',').map(prop => prop.trim()) : undefined))
    .optional(),
  ARRAY_FIELDS_TO_FLATTEN: z
    .string()
    .transform(str => (str ? str.split(',').map(field => field.trim()) : []))
    .default(''),
  DATE_FIELDS: z
    .string()
    .transform(str => (str ? str.split(',').map(field => field.trim()) : []))
    .default(''),

  CLIENT_IMAGE_SERVICE_BASE_URL: z.string(),
  CLIENT_IMAGE_FIELD_NAME: z.string(),
  CLIENT_ENTITY_NAME_PROPERTY: z.string(),
  CLIENT_ENTITY_HEADER_PROPERTY: z.string(),
  CLIENT_PROPERTIES_SELECTED_FIELDS: z
    .string()
    .transform(str => (str ? str.split(',').map(field => field.trim()) : []))
    .default(''),
  CLIENT_PROPERTY_LABELS: z.string().transform(val => JSON.parse(val)),
  CLIENT_DEST_LINK_PREFIX: z.string(),
  CLIENT_DEST_LINK_X_NAME: z.string(),
  CLIENT_DEST_LINK_Y_NAME: z.string(),
  CLIENT_TABLE_ID: z.string(),
  CLIENT_TABLE_FIELD: z.string(),
  CLIENT_WANTED_ESSENCE_ROOT: z.string(),
  CLIENT_WANTED_ESSENCE_NODE: z.string(),
  CLIENT_IMAGE_STREAMER_TEMPLATE_URL: z.string(),
});

const serverEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
