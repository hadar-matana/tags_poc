import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { treeEntitiesConfig } from '../config';

export class HttpClient {
  private axiosInstance?: AxiosInstance;
  private baseUrl: string;
  private timeout?: number;

  constructor(baseUrl: string, timeout?: number) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = this.initializeAxiosInstance();
    }
    return this.axiosInstance;
  }

  private initializeAxiosInstance(): AxiosInstance {
    const processedBaseUrl = this.baseUrl.replace(/\/$/, '');
    const configTimeout = this.timeout || treeEntitiesConfig.timeout;

    return axios.create({
      baseURL: processedBaseUrl,
      timeout: configTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get<T>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.getAxiosInstance().get<T>(endpoint, { headers })
      .then(response => response.data)
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout');
          }
          throw new Error(`HTTP error! status: ${error.response?.status || 'unknown'}`);
        }
        throw error;
      });
  }

  post<T>(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<T> {
    return this.getAxiosInstance().post<T>(endpoint, body, { headers })
      .then(response => response.data)
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout');
          }
          throw new Error(`HTTP error! status: ${error.response?.status || 'unknown'}`);
        }
        throw error;
      });
  }
}
