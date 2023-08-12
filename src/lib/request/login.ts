import { api } from '../apis/basic'
export const login = () => api.post<{
  access_token: string;
  refresh_token: string;
}>('http://127.0.0.1:8086/api/login', {
  "name": "zbbtest222",
  "password": "test1234",
}, {
  contentType: 'form',
})
export const LoginUrl = '/api/login'
