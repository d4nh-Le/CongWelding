import React from "react";

const Cart = ({ items }) => {
  return (
    <div>
      <h1>Cart</h1>
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Cart;