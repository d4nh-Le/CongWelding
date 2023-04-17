import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Input, Button } from 'antd';

import SearchBar from './searchbar';
import Logo from '../images/cong-logo.png';
import AccountInfo from '../pages/userdetails';
import './navbar.css';

function Navbar() { 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    handleOk();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleAccountClick = (event) => {
    event.preventDefault();
    showModal();
  };

  const [form] = Form.useForm();

  const handleSignUpClick = () => {
    handleCancel();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-middle">
        <SearchBar />
      </div>
      <div className="navbar-right">
        <a href="/" className="navbar-link" onClick={handleAccountClick}>
          <FontAwesomeIcon icon={faUser} /> | Account
        </a>
        <a href="/cart" className="navbar-link">
          <FontAwesomeIcon icon={faCartShopping} /> | Cart
        </a>
      </div>
      <Modal
        title="Login"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="sign-up">
          New Customer? Please{' '}
          <Link to="/signup" onClick={handleSignUpClick}>
            Sign Up!
          </Link>
          <Link to="/userdetails"> Detailts </Link>

        </div>
      </Modal>
    </nav>
  );
}

export default Navbar;
