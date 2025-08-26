import type { ImageServiceResponse } from '../types/image-api-types';
import type { ExclusiveId } from '../types/tree-api-types';
import { HttpClient } from './http-client';
import { imageServiceConfig } from '../config';


export class ImageApiClient {
  private static instance: ImageApiClient;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = new HttpClient(imageServiceConfig.baseUrl, imageServiceConfig.timeout);
  }

  public static getInstance(): ImageApiClient {
    if (!ImageApiClient.instance) {
      ImageApiClient.instance = new ImageApiClient();
    }
    return ImageApiClient.instance;
  }

  async getImageUrl(exclusiveId: ExclusiveId): Promise<ImageServiceResponse> {
    try {
      const response = await this.httpClient.post<ImageServiceResponse>('/api/image', {
        exclusiveId,
      });
      
      return response;
    } catch (error) {
      return {
        imageUrl: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
