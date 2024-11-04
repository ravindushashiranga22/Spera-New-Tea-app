import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ItemsData.css";

const ItemsData = ({ items }) => {
  const [quantity, setQuantity] = useState(""); // Default empty to show "Select Order"
  const [show, setShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  let ws;

  useEffect(() => {
    ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log("Received message from server:", message);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleShow = () => setShow(true);

  const handleOrder = async () => {
    // Prevent ordering if "Select Order" is chosen
    if (!quantity) {
      setStatusMessage("Please select a valid quantity before ordering.");
      setTimeout(() => {
        setStatusMessage("");
      }, 1000);
      return;
    }

    const userId = window.localStorage.getItem("user");
    const userRole = window.localStorage.getItem("role");

    const orderedItem = {
      name: items.name,
      quantity: quantity,
      image: items.image,
      userId: userId,
      userRole: userRole,
    };

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderedItem),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setStatusMessage(`You have ordered ${quantity} ${items.name}(s).`);
      setTimeout(() => {
        // navigate("/orders");
      }, 1000);
    } catch (error) {
      console.error("There was a problem with the operation:", error);
      toast.error("Network issue, please try again later.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <ToastContainer /> {/* Place this component at the top level */}
      <div className="glass-effect">
        <div onClick={handleShow}>
          <h1 className="text-center">{items.name}</h1>
          <div className="d-flex justify-content-center">
            <img
              src={items.image}
              className="img-fluid"
              style={{ height: "150px", width: "150px", maxWidth: "100%" }}
              alt={items.name}
            />
          </div>
        </div>
        <div className="flex-container">
          <div className="m-1 w-100">
            <p>Quantity</p>
            <select
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              <option value="" disabled>
                Select Order
              </option>
              {[...Array(items.qtyMax).keys()].map((i) => {
                const qty = i + 1;
                return (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                );
              })}
            </select>
            <div className="m-1 w-100 text-center">
              <button className="btn btn-success" onClick={handleOrder}>
                Order Now
              </button>
            </div>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>
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
