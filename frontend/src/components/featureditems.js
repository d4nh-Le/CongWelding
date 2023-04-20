
import React from 'react';
import { Card, Col, Row } from 'antd';
import './featureditems.css';

const FeaturedItems = () => {
  const items = [
    {
      title: 'MIG 250 D15 Mini EDON',
      description: '789.99$',
      image:
        'https://aws-s3-congwelding-upload.s3.ca-central-1.amazonaws.com/MIG+250+D15+Mini+EDON.jpg',
    },
    {
      title: 'Mini 200 REDBO',
      description: '149.99$',
      image:
        'https://aws-s3-congwelding-upload.s3.ca-central-1.amazonaws.com/mini-200-redbo.jpg',
    },
    {
      title: 'ZX7-200E EDON',
      description: '199.99$',
      image:
        'https://aws-s3-congwelding-upload.s3.ca-central-1.amazonaws.com/ZX7-200E+EDON.jpg',
    },
    {
      title: 'MMA 200 EDON',
      description: '339.99$',
      image:
        'https://aws-s3-congwelding-upload.s3.ca-central-1.amazonaws.com/MMA+200+EDON.jpg',
    },
  ];

  return (
    <div className="featured-items-container">
      <h2 className="featured-items-title">Featured Items</h2>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.title}>
            <a href={item.url}>
              <Card cover={<img alt={item.title} src={item.image} />}>
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedItems;
