
import { useEffect, useState } from "react";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Sidebar from "../../components/sidebar/Sidebar";
import NavbarUser from "../../components/navbar/NavbarUser";
import Ordernav from "../../components/navbar/Ordernav";
function OrderList() {
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
});
const columns = [
  { field: 'orderNumber', headerName: 'orderNumber', width: 170 },
  { field: 'orderDate', headerName: 'orderDate', width: 170 },
  { field: 'shippingAddress', headerName: 'shippingAddress', width: 360 },
  {
    field: 'userID', headerName: 'userID', width: 130,
  },
  {
    field: 'total',
    headerName: 'total',
    width: 130,
  },{
    field: 'orderStatus',
    headerName: 'orderStatus',
    width: 130,
  },
  {
    field: 'items',
    headerName: 'items',
    width: 530,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
        <Link to={`/orders/${params.row.orderNumber}`}>
            <button className="productListEdit">See detail</button>
            </Link>
        </>
      );
    },
  },
];




   
  return (<div className='home'>
  <Sidebar />
  
  <div className='container'>
    <Ordernav />
    <div style={{ height: "80vh", width: '100%' }}>
  <DataGrid
    rows={reducedRows}
    columns={columns}
    pageSize={5}
    getRowId={(row) => row.orderNumber}
  rowHeight={70}
  pageSizeOptions={[10, 20, 50, 100]}
    checkboxSelection
  />
</div>
    </div>
  </div>
 
  )
}

export default OrderList