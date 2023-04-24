import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";

const Featured = () => {
  const [orders, setOrders] = useState([]);
  const [weekTotal, setWeekTotal] = useState(0);
const [monthTotal, setMonthTotal] = useState(0);
const [overallTotal, setOverallTotal] = useState(0);

const [quarterTotal, setQuarterTotal] = useState(0);
  useEffect(() => {
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
      setOrders(data.orders);
      console.log(orders);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };
    getOrders();
  }, []);
  useEffect(() => {
    const quarterStart = new Date();
    quarterStart.setMonth(quarterStart.getMonth() - 3);
  
    const quarterTotalAmount = orders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate);
      if (orderDate >= quarterStart) {
        return acc + order.total;
      }
      return acc;
    }, 0);
    setQuarterTotal(quarterTotalAmount);
  }, [orders]);

  useEffect(() => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - 1);
  
    const weekTotalAmount = orders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate);
      if (orderDate >= weekStart) {
        return acc + order.total;
      }
      return acc;
    }, 0);
    setWeekTotal(weekTotalAmount);
  
    const monthTotalAmount = orders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate);
      if (orderDate >= monthStart) {
        return acc + order.total;
      }
      return acc;
    }, 0);
    setMonthTotal(monthTotalAmount);
  
    
    const overallTotalAmount = orders.reduce((acc, order) => {
      return acc + order.total;
    }, 0);
    setOverallTotal(overallTotalAmount);
  }, [orders]);
  

  const progressValue = ((weekTotal / quarterTotal) * 100).toFixed(2);
  const progressText = `${((weekTotal / quarterTotal) * 100).toFixed(2)}%`;
  console.log(progressValue, progressText)
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
      <div className="featuredChart">
          <CircularProgressbar value={progressValue} text={progressText} strokeWidth={5} />
        </div>
        <p className="title">Total sales made this week</p>
        <p className="amount">{weekTotal}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Quarter</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{quarterTotal}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{monthTotal}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Overall </div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{overallTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
