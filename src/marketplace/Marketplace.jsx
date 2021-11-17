import React from 'react';
import { Card, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { IconWrapper, StratiProducts, Carousel } from '@hub/ui-lib';
import { FILTER_TYPE, FilteredProductCategories, productImageMapper } from '../commonUtils';
import './style.css';

const { Meta } = Card;


const productSorter = (a, b) => {
  const t1 = 1;
  const t2 = 2;
  if (t1 < t2) {
    return -1;
  }
  if (t1 > t2) {
    return 1;
  }
  return 0;
};

const Marketplace = () => {
  const productCategories = useSelector((state) => state.productCategories);
  const filteredProductCategoriesWithSubappConfig = new FilteredProductCategories(productCategories)
    .filterByFlags(FILTER_TYPE.SELF_SERVICE)
    .filterByAndApplySubappConfig().value;

  return (
    <div className='wrapper'>
      <h1 style={{ marginTop: '30px' }}>Product Marketplace</h1>
      {allProductCards(filteredProductCategoriesWithSubappConfig)}
    </div>
  );
};

function allProductCards(filteredProductCategoriesWithSubappConfig) {
  const allProducts = Object.keys(filteredProductCategoriesWithSubappConfig).flatMap(
    (cat) => filteredProductCategoriesWithSubappConfig[cat]['products']
  );

  const comingSoonProducts = allProducts
    .filter((p) => p.status === 'COMING_SOON')
    .sort(productSorter);
  const activeProducts = allProducts.filter((p) => p.status === 'ACTIVE').sort(productSorter);

  const settings = {
    slidesToShow: 4,
    infinite: comingSoonProducts?.length > 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <h2>Coming Soon</h2>
      <div>SCSS Testing....</div>
      <Row className='crds' gutter={[24, 24]}>
         Testing...
      </Row>

      <h2>Products</h2>

      <Row className='crds' gutter={[24, 24]}>
        {activeProducts?.map((p) => active(p))}
      </Row>
    </div>
  );
}

function active(product) {
  return product.subappConfig && product.subappConfig.path ? ( // this is just a defensive coding practice.
    <Col span={6} key={product.id}>
      <Link to={product.subappConfig.path}>
        <Card className='crd' cover={image(product)}>
          <Meta title={"Durrab Testing 1"} className='crd-meta' />
        </Card>
      </Link>
    </Col>
  ) : null;
}

const ComingSoon = ({ product }) => (
  <div className='cmng-soon'>
    <Card className='crd' style={{ opacity: 0.7 }} cover={image(product)}>
      <Meta title={"Durrab TEsting 2"} className='crd-meta' />
    </Card>
  </div>
);

function image(product) {
  return productImageMapper[product.id] ? (
    <img className='img' alt={product.id} src={productImageMapper[product.id]} />
  ) : (
   <div>Icon here</div>
  );
}

Marketplace.displayName = 'Marketplace';

export default Marketplace;
