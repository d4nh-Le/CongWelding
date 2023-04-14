import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './account.css';

const Account = () => {
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      message.success('Logged in successfully');
    } catch (error) {
      setLoading(false);
      message.error('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <Form onFinish={handleFinish} className="login-form">
        <h2 className="login-form-header">Log In</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="login-form-button"
        >
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default Account;
