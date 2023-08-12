import { api } from '../apis/basic'
export const upload = (data: {
  filename: string;
  tags?: Array<string>;
  file: File;
}) => api.post<{
  access_token: string;
  refresh_token: string;
}>('http://127.0.0.1:8081/api/upload-buffer', data, {
  contentType: 'form-data',
})
export const UploadUrl = '/api/upload'
