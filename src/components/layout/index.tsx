import React, { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import styles from './layout.module.scss'

export const Layout: FC<PropsWithChildren<{}>> = (props) => {
    const { children } = props

    return (
        <>
            <Head>
                <title>我是真的没找到啊</title>
                <link rel="icon" href="/my-logo.svg" />
            </Head>
            <div className={styles.wrapper}>{children}</div>
        </>
    );
};
