import { z } from 'zod';

export const getTreeOfValuesSchema = z.object({
  table_id: z.string().min(1, 'Table ID is required'),
  field_id: z.string().min(1, 'Field ID is required'),
});

export const getAllTableEntitiesSchema = z.object({
  table_id: z.string().min(1, 'Table ID is required'),
  pageSize: z.number().min(1).max(1000).optional().default(100),
  sort_by: z.string().optional().default('CreationTime'),
  filter: z.string().optional(),
});

export const getTableEntitiesSchema = z.object({
  table_id: z.string().min(1, 'Table ID is required'),
  from: z.number().min(1).optional().default(1),
  to: z.number().min(1).optional().default(100),
  sort_by: z.string().optional().default('CreationTime'),
  filter: z.string().optional(),
});

// TypeScript types derived from schemas
export type GetTreeOfValuesInput = z.infer<typeof getTreeOfValuesSchema>;
export type GetAllTableEntitiesInput = z.infer<typeof getAllTableEntitiesSchema>;
export type GetTableEntitiesInput = z.infer<typeof getTableEntitiesSchema>;
