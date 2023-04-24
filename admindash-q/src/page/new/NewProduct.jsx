import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import placeholder from "../../data/placeholder.png";

import "./newproduct.css";
function NewProduct() { 

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    weldingSpecs: {
      model: '',
      weight: '',
      technology: '',
      powerSupply: '',
      powerConsumption: '',
      noLoadVoltage: '',
      weldingCurrent: '',
      efficiency: '',
      weldingRodSize: '',
      dimensions: '',
      accessories: '',
    },
  });
  
  
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
  const [isWeldingSpecsDisabled, setIsWeldingSpecsDisabled] = useState(false);

const handleWeldingSpecsToggle = (event) => {
  setIsWeldingSpecsDisabled(!isWeldingSpecsDisabled);
};




  const handleSubmit = (event) => {
    event.preventDefault();
    
    let productToSend = { ...product };
  if (isWeldingSpecsDisabled) {
    productToSend = { ...productToSend, weldingSpecs: null };
  }
 
  fetch(`https://localhost:3000/api/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Reset the form after successful submission
    setProduct({
      name: '',
      price: '',
      quantity: '',
      category: '',
      description: '',
      weldingSpecs: {
        model: '',
        weight: '',
        technology: '',
        powerSupply: '',
        powerConsumption: '',
        noLoadVoltage: '',
        weldingCurrent: '',
        efficiency: '',
        weldingRodSize: '',
        dimensions: '',
        accessories: '',
      },
    });
    alert('Product created successfully');
  })
  .catch(error => {
    console.error(error);
    alert(`There was an error creating the product: ${error.message}`);
  });
  };
  
  return (
    <div className='home'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <div className='npleft'>
        <div>
        <img
      src={placeholder}
      alt={"placeholder"}
      style={{ width: "80%", height: "50%" }}
    />
    </div>
    <label  >
  Upload Image
</label>
<input
  id="image-upload"
  type="file"
  name="image"
  accept="image/*" 
  onChange={console.log("u")
  }
/>

        </div>
        <div className='npright'>
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
      />
      </label>
      <label>Product price($):
        <input 
          type="decimal" 
          name="price" 
          value={product.price } 
          onChange={handleChange}
        />
        </label>
        
        <label>Product quantity:
          <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        
        </label>
        <label>category:
          < input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
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
        />
        
        </div>
        </div>
        </div>
        <div className='top'>
        <h1>Product weldingSpecs</h1>
        <div className='fright'>
        <label>
    <input
    className='check'
      type="checkbox"
      checked={!isWeldingSpecsDisabled}
      onChange={handleWeldingSpecsToggle}
    />
   <span className='checktext'> Enable welding specs</span>
  </label>
  </div>
  </div>
  
        <div className="columns2">
        <div className="column2">
        
        <label>model
          < input
          type="text"
          name="weldingSpecs.model"
          value={product.weldingSpecs ? product.weldingSpecs.model : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>weight(KG)
          < input
          type="decimal"
          name="weldingSpecs.weight"
          value={product.weldingSpecs ?product.weldingSpecs.weight  :''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>technology
          < input
          type="text"
          name="weldingSpecs.technology"
          value={product.weldingSpecs ? product.weldingSpecs.technology : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>power Supply 
          < input
          type="text"
          name="weldingSpecs.powerSupply"
          value={product.weldingSpecs ? product.weldingSpecs.powerSupply : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>power Consumption 
          < input
          type="text"
          name="weldingSpecs.powerConsumption"
          value={product.weldingSpecs ?product.weldingSpecs.powerConsumption :''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>noLoadVoltage
          < input
          type="text"
          name="weldingSpecs.noLoadVoltage"
          value={product.weldingSpecs ?product.weldingSpecs.noLoadVoltage : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
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
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>efficiency
          < input
          type="text"
          name="weldingSpecs.efficiency"
          value={product.weldingSpecs ?product.weldingSpecs.efficiency : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>weldingRodSize
          < input
          type="text"
          name="weldingSpecs.weldingRodSize"
          value={product.weldingSpecs ?product.weldingSpecs.weldingRodSize : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />  
        </label>
        <label>dimensions
          < input
          type="text"
          name="weldingSpecs.dimensions"
          value={product.weldingSpecs ?product.weldingSpecs.dimensions : ''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>accessories
          < input
          type="text"
          name="weldingSpecs.accessories"
          value={product.weldingSpecs ?product.weldingSpecs.accessories :''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        <label>Origin
          < input
          type="text"
          name="weldingSpecs.origin"
          value={product.weldingSpecs ?product.weldingSpecs.origin :''}
          onChange={handleChange}
          disabled={isWeldingSpecsDisabled}
        />
        </label>
        </div>
        </div>
        
        <button type="submit" >Confirm</button>


    </form>


        </div>
      </div>
    </div>
  );
}

export default NewProduct