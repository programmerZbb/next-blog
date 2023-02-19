import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { marked, Renderer } from 'marked'
// import * as DOMPurify from 'dompurify'
// console.log(DOMPurify.sanitize, sanitize,'------777777777')

export function getPostsConf(dir: string) {
  const fileNames = fs.readdirSync(dir);
  const allPostsData = fileNames
    .filter((filename) => filename.includes(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(dir, fileName);
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

/**
 * 获取所有可能的id提供给
 */
export function getAllPostIdsByDir(dir: string) {
  const fileNames = fs.readdirSync(dir);

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
export async function getPostDataByDir(dir: string, id: string) {
  const fullPath = path.join(dir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterRes = matter(fileContents);

  // use remark to convert markdown into html string
  const processedContent = await remark().use(html).process(matterRes.content);
  const contentHtml = processedContent.toString();

  // const contentHtml = await marked(fileContents, {
  //   async: true,
  //   renderer: new Renderer(),
  //   gfm: true,
  //   breaks: true,
  // })

  return {
    id,
    contentHtml,
    ...(matterRes.data as {
      title: string;
      date: string;
    }),
  };
}
