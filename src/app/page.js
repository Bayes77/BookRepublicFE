'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

import getAllOrders from './api/ordersData';
import OrderCard from '../../components/OrdersCard';

// import { useAuth } from '@/utils/context/authContext';

function HomePage() {
  // *set state for orders
  const [orders, setOrders] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  // const { user } = useAuth();

  // *function that makes api call to getAllOrders
  const getAllTheOrders = () => {
    getAllOrders().then(setOrders);
  };

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  const searchResults = orders.filter((order) => JSON.stringify(order).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

  // *API call to get getAllEvents on component to render
  useEffect(() => {
    getAllTheOrders();
  }, []);

  return (
    <>
      <div className="search-bar-container">
        <input
          style={{
            width: '600px', display: 'block', margin: '0 auto', borderRadius: '7px', marginTop: '15px',
          }}
          type="search"
          placeholder="Search for Orders"
          onChange={handleChange}
          className="search-input"
        />
      </div>
      <div className="text-center my-4">
        <Link href="/order/new" passHref>
          <Button>Add an Order</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {searchResults.map((order) => (
            <OrderCard key={order.id} ordersObj={order} onUpdate={getAllTheOrders} />
          ))}
        </div>
      </div>
    </>
  );
}
export default HomePage;
