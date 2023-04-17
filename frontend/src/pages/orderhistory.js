import React, { useState, useEffect } from 'react';
import './orderhistory.css';

const Orderhistory = () => {

    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        fetch('orders/')
          .then((res) => res.json())
          .then((data) => setOrderHistory(data.orders))
          .catch((err) => console.error(err));
      }, []);

    return (
        <div>
            <h1>Your Order History:</h1>
            {orderHistory.map((order) => (
            <>
            <p> Order Number: {order.orderNumber} </p>
            <p> Date Ordered: {order.orderDate} </p>
            <p> Status of Order: {order.orderStatus} </p>
            <p> Address Shipped To:: {order.shippingAddress} </p>
            <p> Billing Address: {order.billingAddress} </p>
            <p> Subtotal: {order.subtotal} </p>
            <p> Tax: {order.tax} </p>
            <p> Total Cost: {order.total} </p>
            <p> Items in Order: {order.items} </p>
            </>
            ))}
        </div>
    )

};

export default Orderhistory;
