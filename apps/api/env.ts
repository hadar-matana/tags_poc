import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TREE_ENTITIES_API_BASE_URL: z.string(),
  TREE_SCHEMA_NAME: z.string(),
  TREE_ENTITIES_API_TIMEOUT: z.string(),
  TREE_ENTITIES_DEFAULT_PAGE_SIZE: z.string(),
  TREE_ENTITIES_DEFAULT_SORT_BY: z.string(),
  TREE_TABLE_ENTITIES_REQ_FILTER_TEMPLATE: z.string(),
  TREE_CUSTOM_HEADERS: z.string().transform((val) => JSON.parse(val)).optional(),
  USE_TRPC_IMAGE_URLS: z.string().optional(),
  IMAGE_SERVICE_BASE_URL: z.string(),
  COORD_CONV_GROUND_2_IMAGE_PATH: z.string(),
  COORD_CONV_LON_NAME: z.string(),
  COORD_CONV_LAT_NAME: z.string(),
  REQUIRED_PROPERTIES: z.string().transform(str => 
    str ? str.split(',').map(prop => prop.trim()) : undefined
  ).optional(),
  ARRAY_FIELDS_TO_FLATTEN: z.string().transform(str => 
    str ? str.split(',').map(field => field.trim()) : []
  ).default('')
});

const env = envSchema.parse(process.env);

export default env;
