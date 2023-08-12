import React, { FC, useCallback } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import useSWR, { Fetcher } from 'swr'
import useSWRImmutable from 'swr/immutable'
import {} from 'swr/mutation'

import { login, LoginUrl } from '../../lib/request'
import styles from './Login.module.scss'

const fetcher: Fetcher<string> = (url: string) => {
  // 这就是纯粹的api实现，不管你怎么实现
  // return fetch(args[0], args[1]).then(res => res.json())
  // return login()
  return Promise.resolve('old value')
}

const Login: FC = props => {
  const onFinish = useCallback(() => {}, []);
  const onFinishFailed = useCallback(() => {}, []);
  const shouldFetch = true
  const token = 'test'

  const { data, error } = useSWR<string>(LoginUrl, fetcher)

  return (
    <div className={styles.wrap} hidden>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 430 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder='用户名' />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='输入密码' />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>7天内免登录</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login
