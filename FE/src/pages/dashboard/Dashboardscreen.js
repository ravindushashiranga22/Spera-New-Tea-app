// import React, { useEffect, useState } from "react";
// import items from "./items";
// import ItemsData from "./ItemsData";
// import { useNavigate } from "react-router-dom";
// // import {config} from "dotenv";
// // config()

// // require('dotenv').config()

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [shops, setShops] = useState([]);

//   useEffect(() => {
//     const token = window.localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//     fetchShopsData();

//     console.log('---',process.env.REACT_APP_SERVER_IP)

//   }, [navigate]); // Include navigate in the dependency array

//   const fetchShopsData = async () => {
//     try {

//       const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/user/get-shops`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }

//       const responseObj = await response.json();

//       setShops(responseObj);

//       console.log("responseObj", responseObj);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   function timeAgo(timestamp) {
//     const now = new Date();
//     const past = new Date(timestamp);
//     const seconds = Math.floor((now - past) / 1000);

//     const intervals = [
//       { label: "year", seconds: 31536000 },
//       { label: "month", seconds: 2592000 },
//       { label: "week", seconds: 604800 },
//       { label: "day", seconds: 86400 },
//       { label: "hour", seconds: 3600 },
//       { label: "minute", seconds: 60 },
//     ];

//     for (const interval of intervals) {
//       const count = Math.floor(seconds / interval.seconds);
//       if (count >= 1) {
//         return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
//       }
//     }

//     return "just now"; // For cases like < 60 seconds
//   }

//   return (
//     <div
//       className="ml-2 mr-2 background-wrapper"
//       style={{
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//       class="bg-color-1"
//     >
//       {/* <div className="row mb-4 ml-2 mr-2 ">
//         {shops.map(
//           (shop) =>
//             shop?.lastLogin && (
//               <div className="col-12">
//                 <div key={shop._id} className="d-flex align-items-center w-100">
//                   <div>{shop.email}</div>-
//                   <div className="ml-2">
//                     {shop?.lastLogin ? timeAgo(shop?.lastLogin) : "None"}
//                   </div>
//                 </div>
//               </div>
//             )
//         )}
//       </div> */}

//       <div className="row">
//         {items.map((item, index) => (
//           <div className="col-md-3" key={index}>
//             <ItemsData items={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

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
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_IP}/user/get-shops`,
        // `http://localhost:5000/user/get-shops`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseObj = await response.json();
      setShops(responseObj);
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
      className="container-fluid background-wrapper bg-color-1 py-3"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* <div className="row mb-4">
        {shops.map(
          (shop) =>
            shop?.lastLogin && (
              <div className="col-12" key={shop._id}>
                <div className="d-flex align-items-center w-100 bg-light p-2 rounded shadow-sm">
                  <span>{shop.email}</span>
                  <span className="ml-2 text-muted">
                    {shop?.lastLogin ? timeAgo(shop.lastLogin) : 'None'}
                  </span>
                </div>
              </div>
            )
        )}
      </div> */}

      <div className="row">
        {items.map((item, index) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mb-sm-4 mb-md-4 d-flex justify-content-center"
            key={index}
          >
            <ItemsData items={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
