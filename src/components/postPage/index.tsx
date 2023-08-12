import Head from "next/head";
import { useEffect, useState, useRef, FC } from "react";

import { Date } from "@/common/components/date";
import { ContentLayout } from "@/components/contentLayout";
import { BlogLayout } from "@/components/blogLayout";
import Link from "next/link";

import { FullPostData } from "../../types/blog";
import styles from "./postPage.module.scss";

/**
 * post page 整个页面框架
 */
export const PostPage: FC<{ postData: FullPostData }> = ({ postData }) => {
  const { title, contentHtml, date, menu } = postData;
  // 计算向上的偏移量
  const topRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight ? topRef.current?.clientHeight + 30 : undefined);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentLayout>
        <BlogLayout menu={menu ?? []} targetOffset={targetOffset}>
          <div className={styles.main}>
            <section className={styles.wrap}>
              <div className={styles.postInfo} ref={topRef}>
                <div className={styles.infoTitle}>{title}</div>
                <div className={styles.infoDate}>
                  <Date dateString={date} />
                </div>
              </div>
              <div
                id="preview"
                className={styles.mdView}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </section>
            <div className={styles.backHome}>
              <Link href="/" legacyBehavior>
                ← Back to home
              </Link>
            </div>
          </div>
        </BlogLayout>
      </ContentLayout>
    </>
  );
}