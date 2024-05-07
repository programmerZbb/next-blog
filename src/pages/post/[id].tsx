/**
 * 文章详情页，需要在服务端拿到id后去请求接口，然后组装好页面之后返回
 */
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { PostPage } from "@/components/postPage";

import { FullPostData } from "../../types/blog";
import { getAllPostIds, getPostData } from "../../lib/post-remote";

export default function Post({ postData }: { postData: FullPostData }) {
  return (
    <PostPage postData={postData} />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context 页面上的参数内容都有，方便后期请求！
  // console.log(context, '---context');
  const params = context.params;
  // context.req // 这个就是客户端的请求，应该携带了鉴权信息
  const postData = await getPostData(params!.id! as string);

  return {
    props: {
      postData,
    },
  };
}
