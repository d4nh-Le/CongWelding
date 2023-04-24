import { Link, useLocation,useNavigate } from "react-router-dom";
import "./order.css";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from 'react';
import placeholderImage from "../../data/placeholder.png";
import SimpleImageSlider from "react-simple-image-slider";
import Ordernav from "../../components/navbar/Ordernav";

export default function Order() {
  const location = useLocation();
  const orderName = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    
  });
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        fetch("https://localhost:3000/api/orders/"+orderName)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
        setOrder(data.order);
     
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };
    getOrder();
  }, []);
  
  console.log(order)
  return (
    <div className='home'>
      <Sidebar />
      <div className='thecontainer'>
        <Ordernav />
        <div className='ordercontain'>
          <h1>Order Details</h1>
          <div className='ordertop'>
          <div className='orderleft'>
            <ul>
            <li>
                <span>Order Number:</span>
                <span>{order.orderNumber}</span>
              </li>
              <li>
                <span>Order Date:</span>
                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
              </li>
              
            </ul>
            </div>
            <div className='orderright'>
            <li>
                <span>Order Status:</span>
                <span>{order.orderStatus}</span>
              </li>
              <li>
                <span>Subtotal:</span>
                <span>{order.subtotal}</span>
              </li>
            <li>
                <span>Tax:</span>
                <span>{order.tax}</span>
              </li>
              <li>
                <span>Total:</span>
                <span>{order.total}</span>
              </li>
                </div>
                </div>
                <hr />
                <div className='orderbottom'>
                <div className='orderbottomleft'>
  <li>
    <span>Billing Address - Street Address:</span>
    {order.billingAddress && order.billingAddress.streetAddress ? <span>{order.billingAddress.streetAddress}</span> : null}
  </li>
  <li>
    <span>Billing Address - City:</span>
    <span>{order.billingAddress && order.billingAddress.city ? order.billingAddress.city : null}</span>
  </li>
  <li>
    <span>Billing Address - State:</span>
    <span>{order.billingAddress && order.billingAddress.state ? order.billingAddress.state : null}</span>
  </li>
  <li>
    <span>Billing Address - Zip Code:</span>
    <span>{order.billingAddress && order.billingAddress.zipCode ? order.billingAddress.zipCode : null}</span>
  </li>
  <li>
    <span>Billing Address - Country:</span>
    <span>{order.billingAddress && order.billingAddress.country ? order.billingAddress.country : null}</span>
  </li>
</div>

<div className='orderbottomright'>
  <li>
    <span>Shipping Address - Street Address:</span>
    <span>{order.shippingAddress && order.shippingAddress.streetAddress ? order.shippingAddress.streetAddress : null}</span>
  </li>
  <li>
    <span>Shipping Address - City:</span>
    <span>{order.shippingAddress && order.shippingAddress.city ? order.shippingAddress.city : null}</span>
  </li>
  <li>
    <span>Shipping Address - State:</span>
    <span>{order.shippingAddress && order.shippingAddress.state ? order.shippingAddress.state : null}</span>
  </li>
  <li>
    <span>Shipping Address - Zip Code:</span>
    <span>{order.shippingAddress && order.shippingAddress.zipCode ? order.shippingAddress.zipCode : null}</span>
  </li>
  <li>
    <span>Shipping Address - Country:</span>
    <span>{order.shippingAddress && order.shippingAddress.country ? order.shippingAddress.country : null}</span>
  </li>
</div>
<hr />
            <div className='orderbottombottom'>
                <h1>Items</h1>
            <ul>
            {order.items && order.items.map((item, index) => (
    <li key={index}>
        <div className="item-details">
            <h2>{item.name}</h2>
            <div className="item-price">Price: {item.price}</div>
            <div className="item-quantity">Quantity: {item.quantity}</div>
        </div>
    </li>
))}
            </ul>
            </div>
                    /</div>
        </div>
      </div>
    </div>
  );
}
