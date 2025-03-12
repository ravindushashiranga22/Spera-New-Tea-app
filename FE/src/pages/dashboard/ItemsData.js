// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./ItemsData.css";

// const ItemsData = ({ items }) => {
//   const [quantity, setQuantity] = useState(""); // Default empty to show "Select Order"
//   const [show, setShow] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");
//   const navigate = useNavigate();
//   let ws;

//   useEffect(() => {

//     console.log('process.env.REACT_APP_SERVER_IP',process.env.REACT_APP_SERVER_IP)

//     ws = new WebSocket(process.env.REACT_APP_SERVER_IP_WS);

//     ws.onopen = () => {
//       console.log("Connected to WebSocket");
//     };

//     ws.onmessage = (event) => {
//       const message = event.data;
//       console.log("Received message from server:", message);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const handleShow = () => setShow(true);

//   const handleOrder = async () => {
//     // Prevent ordering if "Select Order" is chosen
//     if (!quantity) {
//       setStatusMessage("Please select a valid quantity before ordering.");
//       setTimeout(() => {
//         setStatusMessage("");
//       }, 1000);
//       return;
//     }

//     const userId = window.localStorage.getItem("user");
//     const userRole = window.localStorage.getItem("role");

//     const orderedItem = {
//       name: items.name,
//       quantity: quantity,
//       image: items.image,
//       userId: userId,
//       userRole: userRole,
//     };

//     try {
//       const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderedItem),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       setStatusMessage(`You have ordered ${quantity} ${items.name}(s).`);
//       setTimeout(() => {
//         // navigate("/orders");
//       }, 1000);
//     } catch (error) {
//       console.error("There was a problem with the operation:", error);
//       toast.error("Network issue, please try again later.");
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//         overflow: "hidden",
//       }}
//     >
//       <ToastContainer /> {/* Place this component at the top level */}
//       <div className="glass-effect">
//         <div onClick={handleShow}>
//           <h1 className="text-center">{items.name}</h1>
//           <div className="d-flex justify-content-center">
//             <img
//               src={items.image}
//               className="img-fluid"
//               style={{ height: "150px", width: "150px", maxWidth: "100%" }}
//               alt={items.name}
//             />
//           </div>
//         </div>
//         <div className="flex-container">
//           <div className="m-1 w-100">
//             <p>Quantity</p>
//             <select
//               className="form-control"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             >
//               <option value="" disabled>
//                 Select Order
//               </option>
//               {[...Array(items.qtyMax).keys()].map((i) => {
//                 const qty = i + 1;
//                 return (
//                   <option key={qty} value={qty}>
//                     {qty}
//                   </option>
//                 );
//               })}
//             </select>
//             <div className="m-1 w-100 text-center">
//               <button className="btn btn-success" onClick={handleOrder}>
//                 Order Now
//               </button>
//             </div>
//             {statusMessage && <p className="status-message">{statusMessage}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ItemsData.propTypes = {
//   items: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     qtyMax: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default ItemsData;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ItemsData.css';

const ItemsData = ({ items }) => {
  const [quantity, setQuantity] = useState('');
  const [show, setShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  let ws;

  useEffect(() => {
    ws = new WebSocket(process.env.REACT_APP_SERVER_IP_WS);
    ws.onopen = () => console.log('Connected to WebSocket');

    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Received message from server:', message);
    };

    return () => ws.close();
  }, []);

  const handleShow = () => setShow(true);

  const handleOrder = async () => {
    if (!quantity) {
      setStatusMessage('Please select a valid quantity before ordering.');
      setTimeout(() => setStatusMessage(''), 1000);
      return;
    }

    const userId = window.localStorage.getItem('user');
    const userRole = window.localStorage.getItem('role');

    const orderedItem = {
      name: items.name,
      quantity,
      image: items.image,
      userId,
      userRole,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_IP}/order`,
        // `http://localhost:5000/order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderedItem),
        }
      );

      if (!response.ok) throw new Error('Network response was not ok');

        setStatusMessage(`You have ordered ${quantity} ${items.name}(s).`);
         setTimeout(() => {
         setStatusMessage(); // Clear the message after 1 second
         }, 2000);

    } catch (error) {
      console.error('There was a problem with the operation:', error);
      toast.error('Network issue, please try again later.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 p-3">
      <ToastContainer />
      <div
        className="glass-effect p-4 rounded shadow-lg text-center w-100"
        style={{ maxWidth: '500px' }}
      >
        <div onClick={handleShow} className="mb-3">
          <h1 className="text-center">{items.name}</h1>
          <div className="d-flex justify-content-center">
            <img
              src={items.image}
              className="img-fluid rounded"
              style={{ height: '150px', width: '150px', maxWidth: '100%' }}
              alt={items.name}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>Quantity</p>
          <select
            className="form-control mb-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option value="" disabled>
              Select Order
            </option>
            {[...Array(items.qtyMax).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button className="btn btn-success w-100 mb-3" onClick={handleOrder}>
            Order Now
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
      </div>
    </div>
  );
};

ItemsData.propTypes = {
  items: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    qtyMax: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemsData;
