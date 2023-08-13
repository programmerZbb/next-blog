import { api } from '../apis/basic'
import { SERVER_DOMAIN } from './util';

export const UploadUrl = '/api/upload-buffer'

export const upload = (data: {
  filename: string;
  tags?: Array<string>;
  file: File;
}) => api.post<{
  access_token: string;
  refresh_token: string;
}>(SERVER_DOMAIN + UploadUrl, data, {
  contentType: 'form-data',
})
