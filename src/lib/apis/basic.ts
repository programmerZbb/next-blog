// 封装的 api，使用 fetch
// 参考：https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
import { HttpMethod, ContentType } from './api-types'
import { AbortWithTimeout, obj2formData, RequestError } from './api-util'

interface ApiRestConf {
  headers?: RequestInit['headers'];
  body?: RequestInit['body'];
  cache?: RequestInit['cache'];
  timeout?: number;
  contentType?: keyof typeof ContentType;
}

const getContentType = (type?: keyof typeof ContentType) => {
  if (type === 'form-data') {
    return undefined;
  }
  return {
    'Content-Type': ContentType[type ?? 'json'],
  };
}

/**
 * 抛出 RequestError
 */
const request = <TResponse>(apiInfo: {
  url: string;
  method: typeof HttpMethod[number];
} & ApiRestConf): Promise<TResponse> => {
  const { url, method, timeout = 30000, contentType } = apiInfo

  const headers = {
    ...apiInfo.headers,
    ...getContentType(contentType),
  };

  return fetch(url, {
    method: (method as any as string),
    signal: AbortWithTimeout.timeout(timeout),
    headers,
    body: apiInfo.body,
    cache: apiInfo.cache,
  }).then(async result => {
    // 如果网络错误，就不会进入这个result
    // 状态码在 200-299 范围内
    if (result.ok && result.status === 200) {
      return result.json()
    }
    // 非200的msg先处理为statusText
    // return Promise.reject({
    //   httpCode: result.status,
    //   message: result.statusText,
    // })
    const info = await result.json()
    throw new RequestError('数据请求失败', result.status, info)
  }, rej => {
    console.log(rej);
    throw new RequestError('网络连接失败', undefined, {
      url,
      ...rej,
    });
  }).then(data => {
    if (data.code && data.code === 200) {
      return data.data
    }
    throw new RequestError('数据请求失败', 200, {
      code: data?.code,
      message: data?.message,
    })
  })
}

class Api {
  public get<Res>(url: string, data: Record<string, any>, conf?: ApiRestConf) {
    const search = new URLSearchParams(data)
    const query = `${url}?${search.toString()}`
    return request<Res>({
      url: query,
      method: 'GET',
      ...conf,
    })
  }

  /**
   * 只有post可以定义content-type
   */
  public post<Res>(url: string, data: Record<string, any>, conf?: ApiRestConf) {
    let body: ApiRestConf['body']
    if (conf?.contentType === 'form') {
      const search = new URLSearchParams(data)
      body = search.toString()
    } else if (conf?.contentType === 'form-data') {
      body = obj2formData(data)
    } else {
      body = JSON.stringify(data)
    }

    return request<Res>({
      url,
      method: 'POST',
      body,
      ...conf,
    })
  }
}

export const api = new Api()
