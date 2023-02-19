import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Date } from "@/common/components/date";
import { ContentLayout } from "@/components/contentLayout";
import Link from "next/link";

import { FullPostData } from "../../types/blog";
import { getAllPostIds, getPostData } from "../../lib/post";
import styles from "./post.module.scss";

export default function Post({ postData }: { postData: FullPostData }) {
  const { title, contentHtml, date } = postData;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentLayout>
        <div className={styles.main}>
          <section className={styles.wrap}>
            <div className={styles.postInfo}>
              <div className={styles.infoTitle}>{title}</div>
              <div className={styles.infoDate}>
                <Date dateString={date} />
              </div>
            </div>
            <div
              id="preview"
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </section>
          <div className={styles.backHome}>
            <Link href="/" legacyBehavior>
              ← Back to home
            </Link>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}

/**
 * 静态注入
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id! as string);

  return {
    props: {
      postData,
    },
  };
};

/**
 * 返回所有可能的path
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};
