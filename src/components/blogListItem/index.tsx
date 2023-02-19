import React, { FC } from "react";
import Link from "next/link";

import { Date } from '@/common/components/date'
import { PostsData } from '../../types/blog'
import styles from "./blgListItem.module.scss";

export const BlogListItem: FC<{
  postsData: PostsData;
  href?: string;
}> = ({postsData: {id, title, date}, href}) => {
  
  return (
    <div className={styles.wrap}>
      <div className={styles.link}>
        <Link legacyBehavior href={href ?? `/posts/${id}`}>
          {title || '无题'}
        </Link>
      </div>
      <div className={styles.date}>
        <Date dateString={date} />
      </div>
    </div>
  );
};
