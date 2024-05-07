import { api } from '../apis/basic'
import { SERVER_DOMAIN } from './util';

export interface LoginReq {
  name: string;
  password: string;
  clientId?: string;
  responseType?: string;
  redirectUri?: string;
}

export interface LoginRes {
  code: string;
  redirectUri: string;
}

export const login = (req: LoginReq) => api.post<LoginRes>('http://127.0.0.1:8082' + LoginUrl, req)
export const LoginUrl = '/api/login'
