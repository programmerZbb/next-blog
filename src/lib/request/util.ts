console.log(process.env.NEXT_PUBLIC_API_HOST, '---env3--', process.env.API_PREFIX)
// 如果在服务端请求使用 process.env.API_PREFIX，如果在客户端请求使用 process.env.NEXT_PUBLIC_API_HOST
export const SERVER_DOMAIN = process.env.API_PREFIX ?? process.env.NEXT_PUBLIC_API_HOST;