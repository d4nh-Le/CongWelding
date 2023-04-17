import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
    return (
      <><div className="cart">
        <h1>Your Cart</h1>
      </div>
      
      <Link to='/order'><button className="cart-checkout-button">Proceed to Checkout</button></Link></>
    );
}

export default Cart;
