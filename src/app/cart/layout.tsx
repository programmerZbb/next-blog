import { FC, PropsWithChildren } from 'react'

const Layout: FC = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <div>{children}</div>
    )
}

export default Layout
