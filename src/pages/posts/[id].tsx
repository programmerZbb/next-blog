import type { GetStaticPaths, GetStaticProps } from "next";
import { PostPage } from "@/components/postPage";

import { FullPostData } from "../../types/blog";
import { getAllPostIds, getPostData } from "../../lib/post";

export default function Post({ postData }: { postData: FullPostData }) {
  return (
    <PostPage postData={postData} />
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
 * You cannot use getStaticPaths with getServerSideProps
 * * 不能在ssr中使用 getStaticPaths，只能在ssg中使用。因为是编译时预渲染，需要确定可能路径。
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};
