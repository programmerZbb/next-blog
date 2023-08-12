// 一些api的定义
/**
 * 所有http的方法
 */
export const HttpMethod = [
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE',
] as const

// 前端请求的 content-type 常用的就三种
export const ContentType = {
  'json': 'application/json;charset=utf-8',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'multipart/form-data',
} as const
