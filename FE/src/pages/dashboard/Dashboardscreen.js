import React, { useEffect, useState } from 'react';
import items from './items';
import ItemsData from './ItemsData';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    fetchShopsData();
  }, [navigate]);

  const fetchShopsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/get-shops', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseObj = await response.json();
      setShops(responseObj);
      console.log('responseObj', responseObj);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center w-100 pt-5 pt-sm-6 pt-md-0"
      style={{
        minHeight: '100vh',
        overflowY: 'auto',
        padding: '1rem',
        marginTop: '50px',
      }}
    >
      <div className="container">
        <h1 className="text-center mb-5" style={{ color: '#343a40' }}>
          Order your tea 🍵 to stay awake 😴!
        </h1>
        <div className="row justify-content-center">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={index}>
              <ItemsData items={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
