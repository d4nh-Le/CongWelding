import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Checkbox,
  Select,
  Card,
  Slider,
  Button,
  Modal,
} from 'antd';
import './products.css';

const { Option } = Select;

const WeldingProducts = () => {
  const [filters, setFilters] = useState({
    brand: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    available: false,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch('products/')
      .then((res) => res.json())
      .then((data) => setFilteredProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  const handleBrandChange = (value) => {
    setFilters({ ...filters, brand: value });
  };

  const handleTypeChange = (value) => {
    setFilters({ ...filters, type: value });
  };

  const handlePriceChange = (value) => {
    setFilters({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleAvailableChange = (e) => {
    setFilters({ ...filters, available: e.target.checked });
  };

  const applyFilters = (product) => {
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    if (filters.type && product.type !== filters.type) {
      return false;
    }
    if (filters.minPrice && product.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && product.price > parseInt(filters.maxPrice)) {
      return false;
    }
    if (filters.available && !product.available) {
      return false;
    }
    return true;
  };

  const visibleProducts = filteredProducts.filter(applyFilters);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <div className="filters">
        <Card title="Filters">
          <div className="input-container">
            <Slider
              range
              defaultValue={[0, 1000]}
              onChange={handlePriceChange}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>${filters.minPrice ? filters.minPrice : 0}</div>
              <div>${filters.maxPrice ? filters.maxPrice : 1000}</div>
            </div>
          </div>
          <div className="select-container">
            <Select defaultValue="" onChange={handleBrandChange}>
              <Option value="">Brand</Option>
              <Option value="3M">3M</Option>
              <Option value="Lincoln Electric">Lincoln Electric</Option>
              <Option value="Miller Electric">Miller Electric</Option>
              <Option value="Donaldson Torit">Donaldson Torit</Option>
            </Select>
          </div>
          <div className="select-container">
            <Select defaultValue="" onChange={handleTypeChange}>
              <Option value="">Type</Option>
              <Option value="Auto-darkening">Auto-darkening</Option>
              <Option value="MIG/TIG">MIG/TIG</Option>
              <Option value="Heavy-Duty">Heavy-Duty</Option>
              <Option value="Portable">Portable</Option>
            </Select>
          </div>
          <div className="checkbox-container">
            <Checkbox onChange={handleAvailableChange}>Available</Checkbox>
          </div>
        </Card>
      </div>
      <div className="products">
        <Row gutter={[16, 16]}>
          {visibleProducts.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{ flex: 1 }}
            >
              <div className="product-card-wrapper">
                <Card className="product-card" hoverable>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-brand">{product.brand}</div>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '200px', height: '150px' }}
                    />
                    <div className="product-type">{product.type}</div>
                    <div className="product-price">${product.price}</div>
                    {product.available ? (
                      <div className="product-available">Available</div>
                    ) : (
                      <div className="product-unavailable">Unavailable</div>
                    )}
                  </div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default WeldingProducts;
