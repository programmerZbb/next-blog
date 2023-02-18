import { FC, PropsWithChildren } from 'react'

const Loading: FC = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <div>{'loading'}</div>
    )
}

export default Loading
