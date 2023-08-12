import React, { FC, useState } from 'react';

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, FormInstance } from 'antd';
import { message, Upload, Form, Input, Button } from 'antd';
import useSWRMutation from 'swr/mutation';

import { upload, UploadUrl } from '../../lib/request/upload'

import styles from './Upload.module.scss';

const { Dragger } = Upload;
// const {} = useSWRMutation(UploadUrl, (_, ) => upload())


const UploadPage: FC = props => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<File>();

  const uploadProps = (form: FormInstance<any>): UploadProps => ({
    name: 'file',
    multiple: true,
    // action: 'http://127.0.0.1:8081/upload',
    // action: 'http://127.0.0.1:8081/uploads',
    // action: 'http://127.0.0.1:8081/upload-buffer', // 测试切片上传
    // action: 'http://127.0.0.1:8081/api/upload', // nest上传测试
    // customRequest: async ({filename, file, onError, onSuccess}) => {
    //   try {
    //     await upload({
    //       filename: filename!,
    //       file: file as File,
    //     })
    //     onSuccess && onSuccess({});
    //   } catch(err) {
    //     onError && onError({} as any);
    //   }
    // },
    data: {
      info: 'test',
    },
    beforeUpload: (file) => {
      setFile(file as File);
      form.setFieldValue('filename', file.name.split('.')[0]);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  });

  const uploadFile = async ({filename, file, tags}: {
    filename: string;
    file: File;
    tags?: Array<string>;
  }) => {
    try {
      await upload({
        filename,
        file,
        ...tags ? {
          tags,
        } : {},
      })
      message.success('上传成功');
    } catch(err) {
    }
  }

  return (
    <div className={styles.wrap}>
      <Form
        name="upload"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 430 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="上传文件" required>
          <Upload.Dragger {...uploadProps(form)}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item
          label="文件名称"
          name="filename"
          rules={[{ required: true, message: '请输入文件名称' }]}
        >
          <Input placeholder='文件名称' />
        </Form.Item>

        <Form.Item
          label="标签"
          name="tags"
        >
          <Input placeholder='标签' />
        </Form.Item>

        <Form.Item
          label=" "
          name="tags"
        >
          <Button type="primary" htmlType="submit" onClick={() => {
            const { filename, tags } = form.getFieldsValue()
            if (file) {
              uploadFile({
                filename,
                tags: tags ? tags.split(',') : undefined,
                file,
              });
            }
          }}>上传</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPage
