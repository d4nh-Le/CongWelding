import Home from "./page/home/Home";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,BrowserRouter,
  Routes,
} from "react-router-dom";
import Login from "./page/login/Login"
import List from "./page/list/List";
import Single from "./page/single/Single";
import New from "./page/new/New";
import Sidebar from "./components/sidebar/Sidebar";


function App() {
  return (
    <div className="App">
   <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="users">
          <Route index element={<List />}></Route>
          <Route path=":userId" element={<Single />}></Route>
          <Route path="new" element={<New />}></Route>
          </Route>
          <Route path="products">
          <Route index element={<List />}></Route>
          <Route path=":productId" element={<Single />}></Route>
          <Route path="new" element={<New />}></Route>
          </Route>
      </Route>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
