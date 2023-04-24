import Home from "./page/home/Home";
import React, { useContext,useEffect } from "react";
import { Routes, Route, Navigate, } from "react-router-dom";
import Login from "./page/login/Login";
import UserList from "./page/list/UserList";
import User from "./page/single/User";
import ProductList from "./page/list/ProductList";
import Product from "./page/single/Product";
import NewProduct from "./page/new/NewProduct";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./AuthContext";
import OrderList from "./page/list/OrderList";
import Order from "./page/single/Order";

function App() {
  const { admin } = useContext(AuthContext);
  
  return (
    <div className="App">
      {admin !== null ? (
        <>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<User />} />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<Product />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
            <Route path="orders">
              <Route index element={<OrderList />} />
              <Route path=":orderNumber" element={<Order />} />
            
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
          </Route>
        </Routes>
      )}
    </div>
    
  );
}

export default App;
