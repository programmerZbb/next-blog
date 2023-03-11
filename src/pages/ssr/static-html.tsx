import React, { FC } from 'react';
import { GetServerSideProps } from 'next'
import { ReactComponent as Svg } from 'public/my-logo.svg'

// 测试ssr情况下的导出html
export const StaticHtml: FC<{res: string}> = ({res}) => {
    return (
        <div>
            我是测试测试2
            <Svg />
            <div>222</div>
            <div>{res}</div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await new Promise((res, rej) => {
        setTimeout(() => {
            res('new data')
        }, 100);
    })

    return {
        props: {res}
    }
}

export default StaticHtml
