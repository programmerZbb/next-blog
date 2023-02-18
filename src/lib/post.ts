import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDir = path.join(process.cwd(), "./src/posts");
const wordDir = path.join(process.cwd(), "./src/words");

export function getStoredPostsData() {
  const fileNames = fs.readdirSync(postDir);
  const allPostsData = fileNames.filter(filename => filename.includes('.md')).map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDir, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterRes = matter(fileContent);

    return {
      id,
      ...(matterRes.data as {
        title: string;
        date: string;
    }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 异步请求
// export async function getStoredPostsData() {
//     const data = await Promise.resolve([
//         {
//             id: '1111',
//             title: '111111title',
//             date: '5555',
//         },
//         {
//             id: '2222',
//             title: '222222title',
//             date: '6666',
//         },
//     ])

//     return data
// }

/**
 * 获取所有可能的id提供给
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDir);

  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  // 一定要返回以下结构
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

/**
 * 通过id获取post内容
 */
export async function getPostData(id: string) {
  const fullPath = path.join(postDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterRes = matter(fileContents);

  // use remark to convert markdown into html string
  const processedContent = await remark().use(html).process(matterRes.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterRes.data,
  };
}
