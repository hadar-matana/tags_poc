import type { MultiPoint } from "geojson";
import { coordConverterEndpoints, treeEntitiesConfig } from "../config/index";
import { HttpClient } from "./http-client";

export class CoordConverterClient {
  private baseUrl: string;
  private httpClient: HttpClient;

  constructor(baseUrl?: string) {
    this.baseUrl = (baseUrl || treeEntitiesConfig.baseUrl).replace(/\/$/, '');
    this.httpClient = new HttpClient(this.baseUrl);
  }

  async ground2Image(params: {imageId: string, lon: number, lat: number}): Promise<MultiPoint> {
    const { imageId, lon, lat } = params;
    const endpointPath = coordConverterEndpoints.ground2Image(imageId, lon, lat);
    return this.httpClient.get(endpointPath);
  }
}
