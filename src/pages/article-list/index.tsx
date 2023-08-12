// 文章列表页，不推荐使用服务端渲染，因为数据随时都能发生变化
import { FC, useState, useMemo, useCallback } from 'react';
import useSWR, { Fetcher } from 'swr';
import { Skeleton, message } from 'antd';
import { EyeOutlined, LikeOutlined, FileWordOutlined } from '@ant-design/icons';
import { ContentLayout } from "@/components/contentLayout";

import { ArticleListPath, getArticleList, ArticleListReq } from '../../lib/request';
import styles from './ArticleList.module.scss';

const getReadTime = (count: number): string => {
  const min = count / 300;
  return `${Math.ceil(min)}分钟`;
}

const ArticleList: FC = props => {
  const [pageInfo, setPageInfo] = useState<ArticleListReq>({
    page: 1,
    pageSize: 10,
  })

  const { data, error, isLoading } = useSWR(ArticleListPath, () => getArticleList(pageInfo));

  // const renderItem = useCallback((key: number) => (
  //   <div className={styles.listItem}>
  //     <div className={styles.listItemTitle}>我是标题</div>
  //     <div className={styles.listItemAbstract}>我是摘要</div>
  //     <div className={styles.listItemInfo}>
  //       <div className={styles.listItemMetadata}>
  //         <div className={styles.metadataItem}>
  //           <EyeOutlined />
  //           <div className={styles.count}>{data!.viewCount}</div>
  //         </div>
  //         <div className={styles.metadataItem}>
  //           <EyeOutlined />
  //           <div className={styles.count}>{data!.starCount}</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ), [data]);

  const renderList = useCallback(() => {
    if (isLoading) {
      return (
        <div className={styles.loading}>
          <Skeleton active />
        </div>
      );
    }
    if (error) {
      message.error(error?.message || '请求失败，请重试！');
      console.log(error);
      return <>请求失败</>;
    }
    return (
      <div className={styles.listWrap}>
        {data != null && data.map(item => (
          <a href={`/post/${item.id}`} className={styles.listItem} key={item.id}>
            <div className={styles.listItemTitle}>{item.name}</div>
            <div className={styles.listItemAbstract}>{item.abstract}</div>
            <div className={styles.listItemInfo}>
              <div className={styles.listItemMetadata}>
                <div className={styles.metadataItem}>
                  <FileWordOutlined />
                  <div className={styles.count}>{item.contentCount}</div>
                </div>
                <div className={styles.metadataItem}>
                  <EyeOutlined />
                  <div className={styles.count}>{item.viewCount}</div>
                </div>
                <div className={styles.metadataItem}>
                  <LikeOutlined />
                  <div className={styles.count}>{item.starCount}</div>
                </div>
                <div className={styles.readTime}>预计阅读{getReadTime(item.contentCount)}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  }, [data, error, isLoading]);

  return (
    <ContentLayout>
      {renderList()}
    </ContentLayout>
  );
};

export default ArticleList;
