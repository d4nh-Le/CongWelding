import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PublishIcon from '@mui/icons-material/Publish';
import { Link } from "react-router-dom";
import "./user.css";
import placeholder from "../../data/placeholder.png";
import Sidebar from "../../components/sidebar/Sidebar";
import NavbarUser from "../../components/navbar/NavbarUser";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
export default function User() {

  const location = useLocation();
  const userEmail= location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [user, setUser] = useState({
    __id: null,
    firstName: null,
    lastName: null,
    password: null,
    email: null,
    createdAt: null,
    id: null
  });
  
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userEmail}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setUser(data.user);
        
        const ordersResponse = await fetch(`/api/orders/user/${data.user.id}`);
      if (!ordersResponse.ok) {
        throw new Error("Network response was not ok");
        
      }
      const ordersData = await ordersResponse.json();
      console.log(ordersData.orders)
      setOrders(ordersData.orders);
      } catch (error) {
        alert ("No order found", error);
        
      }
    }
    fetchUser();
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
  { field: 'orderNumber', headerName: 'orderNumber', width: 200 },
  { field: 'orderDate', headerName: 'orderDate', width: 130 },
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
  return (
<div className='home'>
      <Sidebar />
      
      <div className='container'>
        <NavbarUser />
      <div className="user">
      
      <div className="userContainer">
      <div className="parentDiv">
        <div className='toptop'>
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={placeholder}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.firstName} {user.lastName}</span>
             
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">{user.email}</span>
            <div className="userShowInfo">
              <AccountCircleIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.firstName} {user.lastName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt ? user.createdAt.substring(0, 10) : ""}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneIphoneIcon className="userShowIcon" />
              <span className="userShowInfoTitle"> null </span>
            </div>
            <div className="userShowInfo">
              <MailIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">null </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={`${user.firstName} ${user.lastName}`}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={`${user.email}}`}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="null"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>gender</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={placeholder}
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
       </div>
        <div className="userOrders"style={{ height: "50vh", width: '100%'}}>
  <DataGrid
    rows={reducedRows}
    columns={columns}
    pageSize={5}
    getRowId={(row) => row.orderNumber}
  rowHeight={80}
  pageSizeOptions={[10, 20, 50, 100]}
    checkboxSelection
  />
</div>
</div>
      </div>
    </div>
        
     
    </div>

</div>

    
  );
}
