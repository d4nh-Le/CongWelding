import React from 'react';
import './navbar-second.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, BarsOutlined } from '@ant-design/icons';

function Navbar2() {
  const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar2">
      <div className="items">
        <span>
          <a href="products" className="dropdown-link">
            <BarsOutlined /> All
          </a>
        </span>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-link">
            Equipment1 <DownOutlined />
          </span>
        </Dropdown>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-link">
            Equipment2 <DownOutlined />
          </span>
        </Dropdown>
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-link">
            Equipment3 <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar2;
