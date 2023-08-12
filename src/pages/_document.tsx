// 自定义 document，参考：https://nextjs.org/docs/pages/building-your-application/routing/custom-document

import Document, { Html, Head, Main, NextScript } from 'next/document'
import { FC } from 'react'
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import type { DocumentContext, DocumentInitialProps } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </>
      ),
    };
  }
}

export default MyDocument
