
import { useEffect, useState } from "react";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Sidebar from "../../components/sidebar/Sidebar";
import NavbarUser from "../../components/navbar/NavbarUser";

function UserList() {
    const [users, setUsers] = useState([]);
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
    setUsers(data.users);
    console.log(users);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
    } catch {}
  };
  getUsers();
}, []);

const reducedRows = users.map(users => ({ id: users.id,firstName: users.firstName,lastName: users.lastName,email: users.email,isVerified: users.isVerified,address: users.address }));
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 260 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 330,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          {params.row.firstName} {params.row.lastName}
        </div>
      );
    }
    
  },
  {
    field: 'email',
    headerName: 'email',
    width: 330,
  },
  //{
   // field: 'isVerified',
   // headerName: 'isVerified',
//width: 100,

  //},
{
    field: 'address',
    headerName: 'address',
    width: 330,
    sortable: false,
},
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/users/${params.row.email}` }>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteSweepIcon
            className="productListDelete"
            onClick={() =>{
                console.log("delete");
            }}
          />
        </>
      );
    },
  },
];




   
  return (<div className='home'>
  <Sidebar />
  
  <div className='container'>
    <NavbarUser />
    <div style={{ height: "80vh", width: '100%' }}>
  <DataGrid
    rows={reducedRows}
    columns={columns}
    pageSize={5}
    
  rowHeight={70}
  pageSizeOptions={[10, 20, 50, 100]}
    checkboxSelection
  />
</div>
    </div>
  </div>
 
     


  )
}

export default UserList