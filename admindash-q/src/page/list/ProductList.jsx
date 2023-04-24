
import { useEffect, useState } from "react";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./ProductList.css";
function ProductList() {
    const [products, setProducts] = useState([]);
useEffect(() => {
  const getProducts = async () => {
    try {
      fetch("api/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const reducedData=data.products.map((item)=>({id:item._id,name:item.name,image:item.image,description:item.description,price:item.price,quantity:item.quantity,model:item.weldingSpecs ? item.weldingSpecs.model : undefined,weight:item.weldingSpecs ? item.weldingSpecs.weight : undefined, dimensions:item.weldingSpecs ? item.weldingSpecs.dimensions : undefined,category:item.category }))
    setProducts(reducedData);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
    } catch {}
  };
  getProducts();
}, []);

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'image',
    headerName: 'Image',
    renderCell: (params) => {
      return (
        <div className="productListImgContainer">
      <img className="productListImg" src={params.row.image} alt={params.name} />
    </div>
      );
    },
    sortable: false,
  },
  { field: 'description', headerName: 'Description', width: 460 ,sortable: false,},
  {
    field: "category",
    headerName: "category",
    width: 130,
    type: "text",
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'string',
    width: 120,
  },
  
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 120,
  },{
    field: 'model',
    headerName: 'Model',
    width :160
  },
  {
    field: 'dimensions',
    headerName: 'dimensions',
    width :230
  },
  {
    field: "weight",
    headerName: "Weight",
    width: 130,
    type: "text",
  },
  {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      return (
        <>
        <div className="productListImgContainer">

          <Link to={`/products/${params.row.name}`}>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteSweepIcon
            className="productListDelete"
            onClick={() => deleteProduct(params.row.name)}
          />
          </div>
        </>
      );
    },
  },
];
const deleteProduct = (id) =>{
  const confirmed = window.confirm("Are you sure you want to delete this product?");
  if (confirmed) {
    fetch(`https://localhost:5000/api/products/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Product deleted:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}


  return (<div className='home'>
  <Sidebar />
  
  <div className='container'>
    <Navbar />
    <div style={{ height:"80vh", width: '100%' }}>
    <DataGrid
  rows={products}
  columns={columns}
  rowHeight={70}
  pageSizeOptions={[10, 20, 50, 100]}
  checkboxSelection
 
/>
</div>
    </div>
  </div>
 
  )
}

export default ProductList