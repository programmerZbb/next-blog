import { api } from '../apis/basic'
import { SERVER_DOMAIN } from './util';

export const ArticleListPath = '/api/article/detail';

export interface ArticleDetailReq {
  id: string;
}

export interface ArticleDetailRes {
  id: number;
  contentPath: string;
  name: string;
  updateTime: string;
}

export const getArticleDetail = (req: ArticleDetailReq) =>
  api.get<ArticleDetailRes>(SERVER_DOMAIN + ArticleListPath, req)
