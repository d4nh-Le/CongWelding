import React from 'react';
import { Card, Col, Row } from 'antd';
import './featureditems.css';

const FeaturedItems = () => {
  const items = [
    {
      title: 'Fronius TransSteel 2200c Multi-Process Welder',
      description: '4200$',
      image:
        'https://cdn.shopify.com/s/files/1/2778/4524/products/Untitleddesign_39.png?v=1646682861&width=1200',
      url: 'https://canadaweldingsupply.ca/collections/multi-process-welders/products/fronius-transsteel-2200c-multi-process-welder',
    },
    {
      title: 'Metabo 710 Compact Die Grinder      ',
      description: '286$',
      image:
        'https://cdn.shopify.com/s/files/1/2778/4524/products/Metabo710CompactDieGrinder.png?v=1646768198&width=1200',
      url: 'https://canadaweldingsupply.ca/collections/frontpage/products/metabo-compact-die-grinder',
    },
    {
      title: 'ESAB Sentinel A60 Welding Helmet      ',
      description: '599$',
      image:
        'https://cdn.shopify.com/s/files/1/2778/4524/products/helmet-sentinel-A-60_34-left_noshadow.jpg?v=1671120749&width=1200',
      url: 'https://canadaweldingsupply.ca/collections/frontpage/products/esab-sentinel-a60-welding-helmet',
    },
    {
      title: 'Lincoln MX Series Premium TIG Welding Gloves  ',
      description: '49$',
      image:
        'https://cdn.shopify.com/s/files/1/2778/4524/products/LincolnMechanixWearTIGGloves.jpg?v=1666378749&width=1200',
      url: 'https://canadaweldingsupply.ca/collections/frontpage/products/lincoln-mx-series-premium-tig-welding-gloves',
    },
  ];

  return (
    <div className="featured-items-container">
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
