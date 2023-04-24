import { Link, useLocation,useNavigate } from "react-router-dom";
import "./Product.css";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from 'react';
import placeholderImage from "../../data/placeholder.png";
import SimpleImageSlider from "react-simple-image-slider";


export default function Product() {
  const location = useLocation();
  const productName = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    warranty: "",
    description: "",
    image: "", // set a default value here
    weldingSpecs: {
      model: "",
      weight: "",
      technology: "",
      powerSupply: "",
      powerConsumption: "",
      noLoadVoltage: "",
      weldingCurrent: "",
      efficiency: "",
      weldingRodSize: "",
      dimensions: "",
      accessories: "",
    },
  });
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        fetch("https://localhost:3000/api/products/"+productName)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.products[0]);
      setProduct(data.products[0]);
     
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };
    getProduct();
  }, []);
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProduct((values) => ({
        ...values,
        [parent]: {
          ...values[parent],
          [child]: value,
        },
      }));
    } else {
      setProduct((values) => ({ ...values, [name]: value }));
    }
  }

  const [disabled, setDisabled] = useState(true);

  const editMode = () => {
    setDisabled(!disabled);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://localhost:3000/api/products/update/'+productName, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
      
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message);
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert("Product update successfully.");
    })
    .catch(error => {
      console.error(error);
      alert(error.message); // Display an alert with the error message
      
    });
};

  const resetProduct=()=>{
    const getProduct = async () => {
      try {
        fetch("https://localhost:3000/api/products/"+productName)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.products[0])
      setProduct(data.products[0]);
      console.log(product);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
      } catch {}
    };
    getProduct();
  }

  const deleteProduct = () =>{
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      fetch(`https://localhost:3000/api/products/delete/${productName}`, {
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
          alert("Product deleted successfully.");
          navigate('/products');
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          
        alert(error.message); // Display an alert with the error message
        });
    }
  }

  return (
    <div className='home'>
      <Sidebar />
      <div className='productcontainer'>
        <Navbar />
        <div className='productleft'>
        <div>
        <div>
  {product.image ? (
    <img
      src={product.image}
      alt={product.name}
      style={{ width: "80%", height: "50%" }}
    />
  ) : (
    <img
      src={placeholderImage}
      alt="Placeholder"
      style={{ width: "80%", height: "50%", float : "left"}}
    />
  )}
</div>
    </div>
  
        </div>
        <div className='productright'>
        <form onSubmit={handleSubmit} className="product_form">
        <div className="section">Product information for {product.name}</div>
        <div className="inner-wrap">
        <div className="columns1">
        <div className="column">
      <label>Product name:
      <input 
        type="text" 
        name="name" 
        value={product.name } 
        onChange={handleChange}
        disabled={disabled}
      />
      </label>
      <label>Product price($):
        <input 
          type="decimal" 
          name="price" 
          value={product.price } 
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        
        <label>Product quantity:
          <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          disabled={disabled}
        />
        
        </label>
        <label>category
          < input
          type="text"
          name="category"
          value={product.category }
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        </div>
        <div className="column1">
        <label> Product description:</label>
          <textarea 
         type="textarea"
         className="textarea"
          name="description"
          value={product.description}
          onChange={handleChange}
          disabled={disabled}
        />
        
        </div>
        </div>
        </div>
        
        <h1>Product weldingSpecs</h1>
        <div className="columns2">
        <div className="column2">
        <label>model
          < input
          type="text"
          name="weldingSpecs.model"
          value={product.weldingSpecs ? product.weldingSpecs.model : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>weight(KG)
          < input
          type="decimal"
          name="weldingSpecs.weight"
          value={product.weldingSpecs ?product.weldingSpecs.weight  :''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>technology
          < input
          type="text"
          name="weldingSpecs.technology"
          value={product.weldingSpecs ? product.weldingSpecs.technology : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>power Supply 
          < input
          type="text"
          name="weldingSpecs.powerSupply"
          value={product.weldingSpecs ? product.weldingSpecs.powerSupply : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>power Consumption 
          < input
          type="text"
          name="weldingSpecs.powerConsumption"
          value={product.weldingSpecs ?product.weldingSpecs.powerConsumption :''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>noLoadVoltage
          < input
          type="text"
          name="weldingSpecs.noLoadVoltage"
          value={product.weldingSpecs ?product.weldingSpecs.noLoadVoltage : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        </div>
        <div className="column2">
        <label>weldingCurrent
          < input
          type="text"
          name="weldingSpecs.weldingCurrent"
          value={product.weldingSpecs?product.weldingSpecs.weldingCurrent : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>efficiency
          < input
          type="text"
          name="weldingSpecs.efficiency"
          value={product.weldingSpecs ?product.weldingSpecs.efficiency : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>weldingRodSize
          < input
          type="text"
          name="weldingSpecs.weldingRodSize"
          value={product.weldingSpecs ?product.weldingSpecs.weldingRodSize : ''}
          onChange={handleChange}
          disabled={disabled}
        />  
        </label>
        <label>dimensions
          < input
          type="text"
          name="weldingSpecs.dimensions"
          value={product.weldingSpecs ?product.weldingSpecs.dimensions : ''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>accessories
          < input
          type="text"
          name="weldingSpecs.accessories"
          value={product.weldingSpecs ?product.weldingSpecs.accessories :''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        <label>Origin
          < input
          type="text"
          name="weldingSpecs.origin"
          value={product.weldingSpecs ?product.weldingSpecs.origin :''}
          onChange={handleChange}
          disabled={disabled}
        />
        </label>
        </div>
        
        </div>

        <button type="button" onClick={deleteProduct} className="productbutton">Delete</button>

        <button type="button" onClick={editMode} className="productbutton">{disabled ? "Edit" : "Cancel"}</button>

        <button type="button" onClick={resetProduct} className="productbutton"> Reset</button>

        <button type="submit" disabled={disabled} className="productbutton">Confirm</button>


    </form>


        </div>
      </div>
    </div>
  );
}
