// 测试 swr 使用
import React, { FC, useCallback } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import useSWR, { Fetcher } from 'swr'
import useSWRImmutable from 'swr/immutable'
import useSWRMutation from 'swr/mutation'

import { login, LoginUrl } from '../../lib/request'

const fetcher: Fetcher<any> = (...args: Array<any>) => {
  // 这就是纯粹的api实现，不管你怎么实现
  // return fetch(args[0], args[1]).then(res => res.json())
  // return login()
  return Promise.resolve({
    name: 'old name',
  })
}

const Login: FC = props => {
  const onFinish = useCallback(() => {}, []);
  const onFinishFailed = useCallback(() => {}, []);
  const shouldFetch = true
  const token = 'test'

  const { data, error, mutate } = useSWRImmutable<any>(LoginUrl, fetcher)
  // 不可变的，不能够多次请求。很适合登录场景
  // const { data, error } = useSWRImmutable(LoginUrl, fetcher)
  // 条件请求，适合于路由被切走了的场景。路由不是当前路由据不去请求。
  // const { data, error } = useSWR(shouldFetch ? LoginUrl : null, fetcher)
  // 依赖请求
  // const { data: user } = useSWR<any>(LoginUrl, fetcher)
  // 如果上个请求还没结果，这个请求永远不会被发出
  // const { data: info } = useSWR(() => '/api/data' + user.id, fetcher)

  // 传入参数
  // 比如传入token
  // const { data: user } = useSWR<any>([LoginUrl, token], fetcher)

  // 只能手动触发的hook，那我为啥不直接调用 fetcher 呢？
  const { trigger } = useSWRMutation<any>(LoginUrl, fetcher, {
    optimisticData: {},
  })

  return (
    <div>
      <div>{data && data.name}</div>
      <button onClick={() => mutate({
        name: 'new name',
      })}>更新数据</button>
    </div>
  );
};

export default Login
