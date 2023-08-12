import type { GetStaticPaths, GetStaticProps } from "next";
import { PostPage } from "@/components/postPage";

import { FullPostData } from "../../types/blog";
import { getAllPostIds, getPostData } from "../../lib/word";

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
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};
