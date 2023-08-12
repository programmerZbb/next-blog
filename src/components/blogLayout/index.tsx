import React, { FC, PropsWithChildren, useCallback, useRef } from "react";
import { Anchor } from 'antd';

// 博客内容页布局，主要是添加了菜单
import type { Menu } from '../../types/blog';
import styles from './blogLayout.module.scss';

export const BlogLayout: FC<PropsWithChildren<{
  menu: Menu;
  targetOffset?: number;
}>> = ({ menu, children, targetOffset }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const onChange = useCallback((currentActiveLink: string) => {
    let linkText = currentActiveLink.split('#')[1]
    // 计算该元素的的滚动距离，需要相对于滚动的元素，因此采用 offsetTop 来计算
    if (scrollRef.current != null && linkText) {
      const targetNode = scrollRef.current.querySelector(`a[title="${linkText}"]`)! as HTMLHtmlElement;
      if (targetNode != null) {
        const scrollTop = targetNode.offsetTop - (scrollRef.current.offsetHeight / 2);
        if (scrollTop > 0) {
          scrollRef.current.scrollTo(0, scrollTop);
        }
      }
    }
  }, [])

  return (
    <div className={styles.articleWrap}>
      <div className={styles.articleSidebar}>
        <div className={styles.catalog}>
          <div className={styles.catalogTitle}>目录</div>
          <div className={styles.catalogBody} ref={scrollRef}>
            <Anchor
              replace
              affix={false}
              items={menu}
              targetOffset={targetOffset}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
