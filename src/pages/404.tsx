import React, { FC } from 'react';
import { Layout } from '@/components/layout'
import styles from './404.module.scss'

const NotFound: FC = props => {
    return (
        <Layout>
            <div className={styles.mainWrap}>我还没想好，或者还没创作出来呢~别急</div>
        </Layout>
    );
};

export default NotFound
