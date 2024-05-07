// 登录页，使用oauth2的方式进行鉴权。
import React, { FC, useCallback, useEffect } from 'react';
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
  const [form] = Form.useForm();

  // 发起请求
  const onFinish = useCallback(async () => {
    const { username, password } = form.getFieldsValue();
    const query = new URLSearchParams(location.search)
    const client_id = query.get('client_id')
    const response_type = query.get('response_type')
    const redirect_uri = query.get('redirect_uri')
    // todo 如果这三个值不存在会发生什么
    if (client_id && response_type && redirect_uri) {
      const res = await login({
        name: username,
        password,
        clientId: client_id,
        responseType: response_type,
        redirectUri: redirect_uri,
      })
      window.location.href = `${res.redirectUri}?code=${res.code}`
    }
  }, [form]);
  const onFinishFailed = useCallback(() => {}, []);
  const shouldFetch = true
  const token = 'test'

  const { data, error } = useSWR<string>(LoginUrl, fetcher)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const client_id = query.get('client_id')
    if (client_id != null) {

    }
  }, []);

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
        form={form}
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
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login
