import type { ExclusiveId } from './tree-api-types';

export interface ImageServiceParams {
  exclusiveId: ExclusiveId;
}

export interface ImageServiceResponse {
  thumbnail: string;
  success: boolean;
  error?: string;
}
