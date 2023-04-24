import React, { useState, useContext } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './login.css';
import icon from '../../data/icon.png';
function Login() {
const { setAdmin, setSessionId } = useContext(AuthContext);
const handleSubmit = async (event) => {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }); 
    if (response.ok) {
      const data = await response.json();
      setAdmin(data.email);
      setSessionId(data.sessionId);
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error(error);
  }
};
  

  return (
    <div className="logincontainer">
    <img src={icon} className="logo" alt="Cong -admin" />
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="" />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <div className="input-group button-wrapper">
  <button className="primary">Log in</button>
</div>
    </form>
  </div>);
}

export default Login;
