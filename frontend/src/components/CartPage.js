import React, { useEffect, useState } from "react";
import Cart from "./cart";

const CartPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>My Cart</h1>
      <Cart items={items} />
    </div>
  );
};

export default CartPage;