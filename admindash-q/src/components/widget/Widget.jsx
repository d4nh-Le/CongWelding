import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Widget = ({ type }) => {
  let data;

  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const getUsers = async () => {
      try {
        fetch("api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setAmount(data.users.length);
      const filteredUsers = data.users.filter(
        (user) =>
    user.createdAt &&
    new Date(user.createdAt) >= new Date(Date.now() - 48 * 60 * 60 * 1000)
      );
 
      setDiff(filteredUsers.length);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };
    const getOrders = async () => {
      try {
        fetch("api/orders")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setAmount(data.orders.length);
      console.log(data.orders)
      const filteredUsers = data.orders.filter(
        (order) =>
          new Date(order.orderDate) >=
          new Date(Date.now() - 48 * 60 * 60 * 1000)
      );
      console.log(filteredUsers)
      setDiff(filteredUsers.length);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };

    const getReve = async () => {
      try {
        fetch("api/orders")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const filteredOrders2 = data.orders.filter(
        (order) =>
          new Date(order.orderDate) >=
          new Date(Date.now() - 7*24 * 60 * 60 * 1000)
      );
      const totalAmount = filteredOrders2.reduce((acc, order) => {
        return acc + order.total;
      }, 0);
      console.log(totalAmount)
      setAmount(totalAmount);
      const filteredOrders = data.orders.filter(
        (order) =>
          new Date(order.orderDate) >=
          new Date(Date.now() - 24 * 60 * 60 * 1000)
      );
      const recAmount = filteredOrders.reduce((acc, order) => {
        return acc + order.total;
      }, 0);
      setDiff(recAmount);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };

    if (type === "user") {
      getUsers();
    }else if (type === "order") {
      getOrders();
    }else if (type === "earning") {
      getReve();
    }
  }, [type]);

  

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        linkto:"/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        linkto:"/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS This week",
        isMoney: true,
        link: "View net earnings",
        linkto:"/orders",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <Link to={data.linkto} className="link">
  <span>{data.link}</span>
</Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} 
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
