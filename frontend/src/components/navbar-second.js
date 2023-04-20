import React from 'react';
import './navbar-second.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, BarsOutlined } from '@ant-design/icons';

function Navbar2() {
  const menu = (
    <Menu>
      <Menu.Item key="1">Stick Welders</Menu.Item>
      <Menu.Item key="2">MIG Welders</Menu.Item>
      <Menu.Item key="3">TIG Welders</Menu.Item>
      <Menu.Item key="4">Plasma Welders</Menu.Item>
    </Menu>
  );

    const menu2 = (
    <Menu>
      <Menu.Item key="1">Power Tools</Menu.Item>
      <Menu.Item key="2">Metal Works</Menu.Item>
      <Menu.Item key="3">Plasma Cutter</Menu.Item>

    </Menu>
  );

     const menu3 = (
    <Menu>
      <Menu.Item key="1">Gloves</Menu.Item>
      <Menu.Item key="2">Helmets</Menu.Item>
      <Menu.Item key="3">Boots</Menu.Item>
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
            Welders <DownOutlined />
          </span>
        </Dropdown>
        <Dropdown overlay={menu2} trigger={['click']}>
          <span className="dropdown-link">
            Tools <DownOutlined />
          </span>
        </Dropdown>
        <Dropdown overlay={menu3} trigger={['click']}>
          <span className="dropdown-link">
            Accessories <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar2;
