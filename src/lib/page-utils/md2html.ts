import matter from "gray-matter";
// 把md文件转换为 mast，md的抽象语法树
import { remark } from "remark";
// 一个 remark 的插件，将mast转换为hast，html版本的抽象语法树
import html from "remark-html";
import type { AnchorLinkItemProps } from 'antd/es/anchor/Anchor';

type MenuItem = AnchorLinkItemProps & {
  level?: number;
}

export const md2html = async (mdContent: string, hrefPrefix?: string) => {
  // use remark to convert markdown into html string
  // sanitize: true 防止XSS的发生
  // 每一层的容器
  let levelContainer: Array<MenuItem>= [{
    key: '',
    href: '',
    children: [],
    title: '',
  }]
  const processedContent = await remark()
    .use(html, {
      sanitize: {
        clobberPrefix: '',
      }, // 开启XSS防御
      handlers: {
        heading(state, node) {
          if (node.children != null && node.children[0] != null) {
            const value = node.children[0].value
            if (value != null) { // 如果写的不规范value是不存在的！
              const item = {
                key: node.depth + value,
                href: (hrefPrefix ?? '') + '#' + value,
                title: value,
                level: node.depth,
              }
              // 记录目录
              // 如果是更深层的目录
              const level = node.depth
              if (levelContainer[level - 1]) { // 如果存在父级
                if (levelContainer[level - 1].children == null) {
                  levelContainer[level - 1].children = []
                }
                // 给父级建立关系
                levelContainer[level - 1].children!.push(item)
                if (level > (levelContainer.length - 1)) {
                  // 记录该目录
                  levelContainer.push(item)
                } else {
                  // 记录该目录
                  levelContainer = [...levelContainer.slice(0, level), item]
                }
              }
            }

            return {
              type: 'element',
              tagName: 'h' + node.depth,
              properties: {
                id: value,
              },
              children: state.all(node)
            }
          }
        }
      },
    })
    .process(mdContent);
    // const contentHtml = addIdForHtml(processedContent.toString());
    const contentHtml = processedContent.toString();

    return {
      contentHtml,
      menu: levelContainer[0].children!,
    }
}
