  import "./mytable.css";
  import * as React from 'react';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import { useState, useEffect } from "react";
    
    

  function MyTable() {
    const [orders, setOrders] = useState([]);
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

    const reducedRows = orders.map(order => {
      const items = order.items.map(item => `${item.name} (${item.quantity})`).join(", ");
      return {
        orderNumber: order.orderNumber,
        orderDate: order.orderDate,
        shippingAddress: `${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`,
        total: order.total,
        items: items,
        userID: order.user,
        orderStatus: order.orderStatus,
        address: order.address,
      };
    }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).slice(0, 4);; // sort by orderDate in descending order

    
    return (
      <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reducedRows.map((row) => (
            <TableRow key={row.orderNumber}>
              <TableCell className="tableCell">{row.orderNumber}</TableCell>
              <TableCell className="tableCell">{row.items}</TableCell>
              <TableCell className="tableCell">{row.userID}</TableCell>
              <TableCell className="tableCell">{row.orderDate}</TableCell>
              <TableCell className="tableCell">{row.total}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.orderStatus}`}>{row.orderStatus}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  export default MyTable