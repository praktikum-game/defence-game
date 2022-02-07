import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export abstract class BaseAPI {
  protected http: AxiosInstance;

  protected constructor(endpoint: string, baseUrlArg: string) {
    this.http = axios.create({
      baseURL: `${baseUrlArg}${endpoint}`,
      withCredentials: true,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices' }),
    });
  }
}
