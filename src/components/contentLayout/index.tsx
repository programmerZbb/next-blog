import React, { FC, PropsWithChildren } from 'react'

import styles from './contentLayout.module.scss'

export const ContentLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.wrap}>{children}</div>
    );
};
