import { api } from '../apis/basic'
import { SERVER_DOMAIN } from './util';

export const ArticleListPath = '/api/article/articleList';

export interface ArticleListReq {
  pageSize: number;
  page: number;
}

export type ArticleListRes = Array<{
  id: number;
  name: string;
  abstract: string;
  updateTime: string;
  viewCount: number;
  contentCount: number;
  starCount: number;
}>

export const getArticleList = (req: ArticleListReq) =>
  api.get<ArticleListRes>(SERVER_DOMAIN + ArticleListPath, req)
