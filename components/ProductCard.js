'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/button';
import Card from 'react-bootstrap/card';
import Link from 'next/link';
import { deleteProduct } from '../api/productData';
import { useAuth } from '../utils/context/authContext';

function ProductCard({ productObj, onUpdate }) {
  const { user } = useAuth();

  // * for deleteing product
  const deleteThisProduct = () => {
    if (window.confirm(`Delete ${productObj.name}?`)) {
      deleteProduct(productObj.id).then(() => onUpdate());
    }
  };

  const isOwner = !productObj.id || productObj.uid === user.uid;

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={productObj.imageUrl} alt={productObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {productObj.name}
          <br /> {productObj.price}
          <br />
        </Card.Title>
        <p className="card-text bold">
          {/* {productObj.sale && (
              <span>
                SALE
                <br />
              </span>
            )}{' '} */}
          <br />${productObj.description}
          <br />
          <br />${productObj.quantity}
          <br />
          <br />${productObj.available}
          <br />
          <br />${productObj.productType}
          <br />
        </p>
        {/* <Link href={productObj.ticketUrl}> */}
        {/* <Button variant="primary" size="sm" id="Details"> */}
        {/* Tickets */}
        {/* </Button> */}
        {/* </Link> */}
        {/* // <br /> */}
        {/* *DYNAMIC LINK TO events DETAILS  */}
        <Link href={`/events/details/${productObj.id}`} passHref>
          <Button id="details" variant="primary">
            Details
          </Button>
          <br />
        </Link>
        {isOwner && (
          <Link href={`/product/edit/${productObj.id}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
            <br />
          </Link>
        )}
        {isOwner && (
          <Button id="delete" onClick={deleteThisProduct} className="m-2">
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
    uid: PropTypes.string,
    productUrl: PropTypes.string,
    description: PropTypes.number,
    imageUrl: PropTypes.string,
    quantity: PropTypes.number,
    available: PropTypes.bool,
    productType: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
