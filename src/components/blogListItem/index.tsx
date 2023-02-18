import React, { FC } from "react";
import Link from "next/link";

import { Date } from '@/common/components/date'
import { PostsData } from '../../types/blog'
import styles from "./blgListItem.module.scss";

export const BlogListItem: FC<{
  postsData: PostsData;
}> = ({postsData: {id, title, date}}) => {
  
  return (
    <div className={styles.wrap}>
      <div className={styles.link}>
        <Link legacyBehavior href={""}>
          {title || '无题'}
        </Link>
      </div>
      <div className={styles.date}>
        <Date dateString={date} />
      </div>
    </div>
  );
};
