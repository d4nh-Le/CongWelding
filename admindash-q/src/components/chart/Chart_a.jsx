import React from 'react';
import "./chart_a.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";


  
  const Chart_a=()=>{

    const [orders, setOrders] = useState([]);
    const [chartData, setChartData] = useState([]);
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
      // Filter orders by last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const filteredOrders = orders.filter(
        (order) => new Date(order.orderDate) >= sixMonthsAgo
      );
    
      // Group orders by month and calculate total revenue
      const groupedOrders = filteredOrders.reduce((acc, order) => {
        const monthYear = order.orderDate.substring(0, 7);
        if (!acc[monthYear]) {
          acc[monthYear] = { monthYear, totalRevenue: 0 };
        }
        acc[monthYear].totalRevenue += order.total;
        return acc;
      }, {});
    
      // Create an array of the last 6 months' names
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        months.push(`${month}/${year}`);
      }
    
      // Populate chart data with months and total revenue
      const chartData = months.map((month) => {
        const [m, y] = month.split("/");
        const monthYear = `${y}-${m.padStart(2, "0")}`;
        const totalRevenue = groupedOrders[monthYear]?.totalRevenue || 0;
        return { name: month, Total: totalRevenue };
      });
    
      setChartData(chartData);
    }, [orders]);
    console.log(chartData)
    return (
        <div className="chart">
        <div className="title"> Monthly Revenue</div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Total" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="typea" stackId="2" stroke="#82ca9d" fill="#82ca9d" />

            </AreaChart>
       </ResponsiveContainer>
        </div>
      );
    
  }
   
    export default Chart_a
     
  
  