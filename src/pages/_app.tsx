import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { ConfigProvider, message } from 'antd'
import { antdTheme } from '../theme/antdThemeConfig';
import { LoginUrl } from '../lib/request/login'

import '@/common/styles/globals.scss';

export default function App({Component, pageProps}: AppProps) {
    return (
        // 全局的swr配置
        <SWRConfig value={{
            // 错误重试配置
            onErrorRetry(err, key, config, revalidate, { retryCount }) {
                // 只有网络连接失败和5xx的请求会进行重试
                if (err.httpCode != null && err.httpCode < 500) return

                // 特定key不做重试
                if (key === LoginUrl) return

                // 最多重试3次
                if (retryCount >= 3) return

                // 重试间隔3s
                setTimeout(() => {
                    revalidate({ retryCount })
                }, 3000);
            },
            // 全局的错误配置
            onError(error, key, config) {
                if (error.httpCode !== 403 && error.httpCode !== 404) {
                    // 我们可以把错误发送给 Sentry，
                    // 或显示一个通知 UI。
                }
                // 网络错误需要弹出一个提示
                if (error.httpCode == null) {
                    message.error('网络连接失败')
                }
            },
            // 固定刷新
            refreshInterval: 2000,
            // 几个重新验证的策略
            revalidateIfStale: true, // 存在旧值的时候，重新验证。如果设置为 true，则 revalidateIfStale 仅在存在任何缓存数据时重新获取，否则不会重新获取。
            revalidateOnFocus: true, // 重新聚焦时验证
            revalidateOnMount: true, // 挂载时验证
            revalidateOnReconnect: true, // 重新连接网络时验证
        }}>
            <ConfigProvider theme={antdTheme}>
                <Component {...pageProps}/>
            </ConfigProvider>
        </SWRConfig>
    )
}