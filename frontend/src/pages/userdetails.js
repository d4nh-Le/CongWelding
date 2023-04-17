import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AccountInfo = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log('Received values of form: ', values);
      setIsEditing(false);
    });
  };

  return (
    <Form
      {...layout}
      form={form}
      initialValues={{
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        password: '********',
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input a valid email address!',
          },
        ]}
      >
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password disabled={!isEditing} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        {!isEditing && (
          <Button type="primary" onClick={handleEdit}>
            Edit
          </Button>
        )}
        {isEditing && (
          <>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default AccountInfo;
