// 一个可以设置超时取消的 AbortController，参考：https://stackoverflow.com/questions/46946380/fetch-api-request-timeout
export class AbortWithTimeout extends AbortController {
  constructor() {
    super()
  }

  static timeout(ms: number) {
    let abortController = new AbortWithTimeout()
    setTimeout(() => {
      abortController.abort()
    }, ms);
    return abortController.signal
  }
}

export const obj2formData = (obj: Record<string, any>): FormData => {
  const formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  });

  return formData
} 

export class RequestError extends Error {
  constructor (
    message: string,
    public httpCode?: number,
    public info?: Record<string, any>,
  ) {
    super(message)
  }
}
