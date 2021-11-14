import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { backendUrl } from './consts';

export abstract class BaseAPI {
  protected http: AxiosInstance;

  protected constructor(endpoint: string) {
    this.http = axios.create({
      baseURL: `${backendUrl}${endpoint}`,
      withCredentials: true,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices' }),
    });
  }
}
