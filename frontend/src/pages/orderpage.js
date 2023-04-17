import React, { useState } from 'react'
import './orderpage.css'

const Orderpage = () => {

    const [shippingStreet, setShippingStreet] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingProvince, setShippingProvince] = useState('');
    const [shippingPostal, setShippingPostal] = useState('');
    const [billingStreet, setBillingStreet] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingProvince, setBillingProvince] = useState('');
    const [billingPostal, setBillingPostal] = useState('');

    return (
        <><h6>Items in Cart:</h6>

        <text>
            Item 1:
            <br />
            Item 2:
            <br />
            Subtotal = $5
            <br />
            Tax = $.25
            <br />
            Total = $5.25
        </text>
        
        <h6>Please enter your Shipping Address:</h6>
        <div classname="shipping-address">
            <input className="order-input" type="text" placeholder="Street" value={shippingStreet} onChange={e => setShippingStreet(e.target.value)}/>
            <input className="order-input" type="text" placeholder="City" value={shippingCity} onChange={e => setShippingCity(e.target.value)}/>
            <input className="order-input" type="text" placeholder="Province" value={shippingProvince} onChange={e => setShippingProvince(e.target.value)}/>
            <input className="order-input" type="text" placeholder="Postal Code" value={shippingPostal} onChange={e => setShippingPostal(e.target.value)}/>
        </div>
        <h6>Please enter your Billing Address:</h6>
        <div classname="billing-address">
            <input className="order-input" type="text" placeholder="Street" value={billingStreet} onChange={e => setBillingStreet(e.target.value)}/>
            <input className="order-input" type="text" placeholder="City" value={billingCity} onChange={e => setBillingCity(e.target.value)}/>
            <input className="order-input" type="text" placeholder="Province" value={billingProvince} onChange={e => setBillingProvince(e.target.value)}/>
            <input className="order-input" type="text" placeholder="Postal Code" value={billingPostal} onChange={e => setBillingPostal(e.target.value)}/>
            <br />
            <br />
            <button className="order-button">Place Order</button>
        </div></>
    );
};

export default Orderpage;