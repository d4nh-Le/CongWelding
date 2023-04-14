import React, { useState } from 'react';
import { Row, Col, Input, Checkbox, Select, Card } from 'antd';

const { Option } = Select;

const products = [
  {
    id: 1,
    name: 'Welding Helmet',
    brand: '3M',
    type: 'Auto-darkening',
    price: 120,
    available: true,
  },
  {
    id: 2,
    name: 'Welding Gloves',
    brand: 'Lincoln Electric',
    type: 'MIG/TIG',
    price: 25,
    available: true,
  },
  {
    id: 3,
    name: 'Welding Jacket',
    brand: 'Miller Electric',
    type: 'Heavy-Duty',
    price: 80,
    available: false,
  },
  {
    id: 4,
    name: 'Welding Fume Extractor',
    brand: 'Donaldson Torit',
    type: 'Portable',
    price: 400,
    available: true,
  },
];

const WeldingProducts = () => {
  const [filters, setFilters] = useState({
    brand: '',
    type: '',
    price: '',
    available: false,
  });

  const handleBrandChange = (value) => {
    setFilters({ ...filters, brand: value });
  };

  const handleTypeChange = (value) => {
    setFilters({ ...filters, type: value });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  const handleAvailableChange = (e) => {
    setFilters({ ...filters, available: e.target.checked });
  };

  const filteredProducts = products.filter((product) => {
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    if (filters.type && product.type !== filters.type) {
      return false;
    }
    if (filters.price && product.price > parseInt(filters.price)) {
      return false;
    }
    if (filters.available && !product.available) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <Row>
        <Col span={6}>
          <Card title="Filters">
            <div style={{ marginBottom: '16px' }}>
              <Input placeholder="Price" onChange={handlePriceChange} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Select
                defaultValue=""
                style={{ width: '100%' }}
                onChange={handleBrandChange}
              >
                <Option value="">Brand</Option>
                <Option value="3M">3M</Option>
                <Option value="Lincoln Electric">Lincoln Electric</Option>
                <Option value="Miller Electric">Miller Electric</Option>
                <Option value="Donaldson Torit">Donaldson Torit</Option>
              </Select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Select
                defaultValue=""
                style={{ width: '100%' }}
                onChange={handleTypeChange}
              >
                <Option value="">Type</Option>
                <Option value="Auto-darkening">Auto-darkening</Option>
                <Option value="MIG/TIG">MIG/TIG</Option>
                <Option value="Heavy-Duty">Heavy-Duty</Option>
                <Option value="Portable">Portable</Option>
              </Select>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Checkbox onChange={handleAvailableChange}>Available</Checkbox>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>
            {filteredProducts.map((product) => (
              <Col key={product.id} span={8}>
                <Card title={product.name}>
                  <p>Brand: {product.brand}</p>
                  <p>Type: {product.type}</p>
                  <p>Price: ${product.price}</p>
                  <p>
                    Availability:{' '}
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default WeldingProducts;