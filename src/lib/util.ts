import fs from "fs";
import path from "path";
// 解析头文件的
import matter from "gray-matter";
// 把md文件转换为 mast，md的抽象语法树
import { remark } from "remark";
// 一个 remark 的插件，将mast转换为hast，html版本的抽象语法树
import html from "remark-html";
import { marked, Renderer } from 'marked'
import { load } from 'cheerio'
import type { AnchorLinkItemProps } from 'antd/es/anchor/Anchor'

import { md2html } from '../lib/page-utils/md2html';
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

const HeadConf = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
];

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
 * 给html head加id
 */
const addIdForHtml = (html: string): string => {
  const $ = load(html)
  for (let head of HeadConf) {
    $(head).each(function(i, ele) {
      $(this).attr('id', $(this).text())
    })
  }
  // cur.attr('id', cur[0])
  return $.html()
}

// const contentHtml = await marked(fileContents, {
  //   async: true,
  //   renderer: new Renderer(),
  //   gfm: true,
  //   breaks: true,
  // })
  // console.log(levelContainer[0].children[1].children[5], '---menu225')

const getMdDataByDir = async (dir: string) => {
  console.log('当前dir为---', dir);
  const content = fs.readFileSync(dir, "utf8");
  const { contentHtml, menu } = await md2html(content)
  return {
    contentHtml,
    menu,
  };
}

const getMdDataWithMetadata = async (dir: string, id: string) => {
  const fileContents = fs.readFileSync(dir, "utf8");

  // step1: 解析头文件
  const matterRes = matter(fileContents);
  const { title, date } = matterRes.data as {
    title?: string;
    date?: string;
  }

  const { contentHtml, menu } = await md2html(matterRes.content)
  // const contentHtml = await marked(fileContents, {
  //   async: true,
  //   renderer: new Renderer(),
  //   gfm: true,
  //   breaks: true,
  // })
  // console.log(levelContainer[0].children[1].children[5], '---menu225')

  return {
    id,
    contentHtml,
    title,
    date,
    menu,
  };
}

/**
 * 通过id获取post内容
 */
export function getPostDataByLocalDir(dir: string, id: string) {
  const fullPath = path.join(dir, `${id}.md`);
  return getMdDataWithMetadata(fullPath, id);
}


// 从远端获取
export function getPostDataByRemoteDir(dir: string, id: string) {
  // const fullPath = path.join(dir, `${id}.md`);
  return getMdDataByDir(dir);
}