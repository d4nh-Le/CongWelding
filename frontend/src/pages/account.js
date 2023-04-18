import React from 'react';
import { Tabs } from 'antd';
import PersonalInfoForm from './PersonalInfoForm';
import PaymentMethodForm from './PaymentMethodForm';
import OrderHistory from './OrderHistory';

const { TabPane } = Tabs;

const AccountPage = () => {
  return (
    <div>
      <h2>My Account</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Personal Information" key="1">
          <PersonalInfoForm />
        </TabPane>
        <TabPane tab="Payment Method" key="2">
          <PaymentMethodForm />
        </TabPane>
        <TabPane tab="Order History" key="3">
          <OrderHistory />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AccountPage;
