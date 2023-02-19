import React, { FC, PropsWithChildren, useEffect, useState, useCallback } from 'react'
import { ArrowUpOutlined } from '@ant-design/icons'
import throttle from 'lodash/throttle'
import classNames from 'classnames/bind'

import { scrollTop } from '../../lib/scroll-top'
import styles from './contentLayout.module.scss'

const ctx = classNames.bind(styles)

export const ContentLayout: FC<PropsWithChildren> = ({children}) => {
    const [showScrollTop, setShowScrollTop] = useState(false)

    const scrollTopEvent = useCallback(throttle((e: Event) => {
        if ((e.currentTarget as any)!.scrollY > 160) {
            setShowScrollTop(true)
        } else {
            setShowScrollTop(false)
        }
    }), [setShowScrollTop])

    useEffect(() => {
        window.addEventListener('scroll', scrollTopEvent)
        return () => {
            window.removeEventListener('scroll', scrollTopEvent)
        }
    }, [])

    return (
        <main className={styles.main}>
            {children}
            <div className={ctx({
                scroll: true,
                hideScroll: !showScrollTop,
            })} onClick={() => scrollTop()}>
                <ArrowUpOutlined />
            </div>
        </main>
    );
};
