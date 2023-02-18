import React, { FC } from "react";

import styles from './profile.module.scss'
import { Labels } from "./label";

export const Profile: FC = (props) => {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <img src="/my-logo.svg" alt="" />
        <div className={styles.username}>{Labels.username}</div>
      </header>
      <section className={styles.introWrap}>
        {/* <p>
          Hello, <strong>I’m programmerzbb</strong>. I’m a front-end developer in Beijing. You can contact me on <a href="mailto:programmerzbb@163.com">programmerzbb@163.com</a>.
        </p> */}
        <p>
          你好, 我是<strong>programmerzbb</strong>，工作在北京的一名前端开发. 你可以联系我通过<a href="mailto:programmerzbb@163.com">programmerzbb@163.com</a>.
        </p>
        <p>
          这里是我的个人网站，目前用来记录我的工作和学习，将来可能加入更多的能力~
        </p>
      </section>
    </div>
  );
};
