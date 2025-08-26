import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  TREE_ENTITIES_API_BASE_URL: z.string(),
  TREE_ENTITIES_API_TIMEOUT: z.string(),
  TREE_ENTITIES_DEFAULT_PAGE_SIZE: z.string(),
  TREE_ENTITIES_DEFAULT_SORT_BY: z.string(),
  USE_TRPC_IMAGE_URLS: z.string().optional(),
  IMAGE_SERVICE_BASE_URL: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
