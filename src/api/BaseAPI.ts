import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { baseUrl } from './consts';

export abstract class BaseAPI {
  protected http: AxiosInstance;

  protected constructor(endpoint: string, baseUrlArg: string = baseUrl) {
    this.http = axios.create({
      baseURL: `${baseUrlArg}${endpoint}`,
      withCredentials: true,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices' }),
    });
  }
}
