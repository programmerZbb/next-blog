import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getPostsConf, getAllPostIdsByDir, getPostDataByDir } from "./util";

const postDir = path.join(process.cwd(), "./src/posts");

export function getStoredPostsData() {
  return getPostsConf(postDir);
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
  return getAllPostIdsByDir(postDir)
}

/**
 * 通过id获取post内容
 */
export async function getPostData(id: string) {
  return getPostDataByDir(postDir, id)
}
