import React, { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

// import RightArrow from 'public/blog/right-arrow.svg'
import styles from "./listWrap.module.scss";

export const ListWrap: FC<
  PropsWithChildren<{
    title: string;
    showMoreLink: string;
  }>
> = ({ showMoreLink, title, children }) => {
  return (
    <section className={styles.wrap}>
      <div className={styles.headerTitle}>{title}</div>
      {children}
      <div className={styles.showMore}>
        <Link legacyBehavior href={showMoreLink}>
          查看更多
        </Link>
        <Image src="/blog/right-arrow.svg" alt="" width={16} height={16} />
      </div>
    </section>
  );
};
