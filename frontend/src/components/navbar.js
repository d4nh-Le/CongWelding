import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import SearchBar from './searchbar';
import Logo from '../images/cong-logo.png';
import './navbar.css';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const { dispatch, email, userId, sessionId } = useContext(AuthContext);
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

  const onFinish = async (values) => {
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Store the session in the dispatch
      console.log(data.userId, data.sessionId);
      dispatch({
        type: 'LOGIN',
        payload: {
          sessionId: data.sessionId,
          email: data.email,
          userId: data.userId,
        },
      });
      handleOk();
    } catch (error) {
      console.error(error);
    }
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
  const handleLogout = async () => {
    try {
      const response = await fetch('/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      dispatch({ type: 'LOGOUT' });
      alert('You have been logged out');
    } catch (error) {
      console.error(error);
    }
  };
  const isLoggedIn = sessionId !== null;

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
        {isLoggedIn ? (
          <>
            <Link to="/userdetails" className="navbar-link">
              {email}
            </Link>
            <a href="/" className="navbar-link" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <a href="/" className="navbar-link" onClick={handleAccountClick}>
            <FontAwesomeIcon icon={faUser} /> | Account
          </a>
        )}
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
            name="email"
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
          <Link to="/userdetails"> Details </Link>
        </div>
      </Modal>
    </nav>
  );
}

export default Navbar;
