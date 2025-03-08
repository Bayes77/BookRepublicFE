'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteOrders } from '../src/app/api/ordersData';

function OrdersCard({ ordersObj, onUpdate }) {
  const { user } = useAuth();

  // * this function is for deleting orders
  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${ordersObj.Name}?`)) {
      deleteOrders(ordersObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card id="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={ordersObj.imageUrl} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {ordersObj.Name}
          <br />
        </Card.Title>
        <p className="card-text bold">
          {/* {eventsObj.sale && (
            <span>
              SALE
              <br />
            </span>
          )}{' '} */}
          {ordersObj.date}
          {ordersObj.time}
          <br />
        </p>

        <br />
        {/* *DYNAMIC LINK TO order DETAILS  */}
        <Link href={`/orders/${ordersObj.firebaseKey}`} passHref>
          <Button id="details" variant="primary">
            Details
          </Button>
          <br />
        </Link>
        {user.uid === ordersObj.uid && (
          <Link href={`/orders/edit/${ordersObj.firebaseKey}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
            <br />
          </Link>
        )}
        {user.uid === ordersObj.uid && (
          <Button id="delete" onClick={deleteThisOrder} className="m-2">
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

OrdersCard.propTypes = {
  ordersObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    Name: PropTypes.string,
    id: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrdersCard;
