import React from 'react';
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';




const Chart_b = () => {
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
    const sortedProducts = data.products.sort((a, b) => a.quantity - b.quantity);

          // Take only the top 20 most expensive products
          const topProducts = sortedProducts.slice(0, 11);

          setProducts(topProducts);
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
    } catch {}
  };
  getProducts();
}, []);

  return (
    <BarChart
    barSize={30}
      width={600}
      height={1100}
      data={products}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" fill="#8884d8" />
      <Bar dataKey="quantity" fill="#423295" />
    </BarChart>
    
  );
};

export default Chart_b;