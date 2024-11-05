import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Orders.css";
import image1 from "./coffee-cup.png";
import image2 from "./coffee.png";
import image3 from "./coffee222.png";
import image4 from "./plain tea.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import acceptIcon from "./tick-mark.png";
import cancelIcon from "./cancel.png";
import doneIcon from "./like.png";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ isCompleted, isCanceled }) => ({
  backgroundColor: isCompleted ? "transparent" : isCanceled ? "transparent" : "#d1c7bd", // Different colors for completed and canceled
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [teaCount, setTeaCount] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(""); 
  const pageRef = useRef(null);
  const userRole = window.localStorage.getItem("role");
  const userId = window.localStorage.getItem("userId");
  const [ws, setWs] = useState(null);
  const [isCanceledByUser, setIsCanceledByUser] = useState({});
  const [acceptSuccessMessage, setAcceptSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const ordersData = await response.json();
      const filteredOrders = userRole === "Shop"
        ? ordersData?.orders.filter((order) => order.orderedBy !== userId)
        : ordersData?.orders;

      setTeaCount({
        "ප්ලේන් ටී": ordersData?.teaCounts["ප්ලේන් ටී"],
        "කිරි කෝපී": ordersData?.teaCounts["කිරි කෝපී"],
        "කෝපී": ordersData?.teaCounts["කෝපී"],
        "කිරි තේ": ordersData?.teaCounts["කිරි තේ"],
      });

      const sortedOrders = filteredOrders.sort((a, b) => a.isCompleted - b.isCompleted);
      setOrders(sortedOrders);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorMessage("Network issue, please try again.");
    }
  };
  useEffect(() => {
    console.log("Order");
    const socket = new WebSocket("ws://localhost:5000");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message?.type) {
          case "order-update":
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order._id === message.order._id
                  ? { ...order, ...message.order }
                  : order
              )
            );
            break;
          case "order-cancel":
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order._id === message.orderId
                  ? { ...order, isAccepted: false }
                  : order
              )
            );
            break;
            case "order-accept":
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order._id === message.orderId
                  ? { ...order, isAccepted: true }
                  : order
              )
            );
            break;
          case "new-order":
            setOrders((prevOrders) => [...prevOrders, message.order]);
            break;
          case "new-order-reload":
            fetchOrders();
            break;
          default:
            console.error("Unknown message type:", message.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message as JSON:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);


  useEffect(() => {
    fetchOrders();
  }, [refresh, userRole, userId]);

  const handleOrderAction = async (orderId, action) => {
    try {
      let method;
      let body;
    
      if (action === "cancel") {
        method = "PUT";
        body = {
          isCanceled: true,
          ispredefinedReasons: true,
          isCanceledByUser: userRole !== "Shop", // Set isCanceled to true
          cancelReason: selectedOption  || "Order Canceled by You",
            // Add selectedOption as reason
        };
      setIsCanceledByUser((prev) => ({ ...prev, [orderId]: userRole !== "Shop" }))
      } else if (action === "done") {
        method = "PUT";
        body = { isCompleted: true };
      } else if (action === "accept") {
        method = "PUT";
        body = { isAccepted: true };
        setAcceptSuccessMessage("Order accepted successfully!");
        setTimeout(() => setAcceptSuccessMessage(""), 1060);
      }
    
      const response = await fetch(`http://localhost:5000/order/${orderId}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    
      if (!response.ok) throw new Error("Network response was not ok");
    
      if (action === "cancel") {
        setCancelSuccessMessage(`Order canceled successfully! Reason: ${selectedOption || "Order Canceled by You"}`)
        setTimeout(() => setCancelSuccessMessage(""), 1060);
        setSelectedOption(""); // Clear selected option
      }
      setRefresh(!refresh);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating order:", error);
      setErrorMessage("Network issue, please try again");
    }
  };
  
  

  const items = [
    { id: 1, name: "කිරි තේ", imageUrl: image1 },
    { id: 2, name: "කෝපී", imageUrl: image2 },
    { id: 3, name: "කිරි කෝපී", imageUrl: image3 },
    { id: 4, name: "ප්ලේන් ටී", imageUrl: image4 },
  ];

  // const predefinedReasons = ["සීනි ඉවරයි", "පිටි ඉවරයි", "තේ කොල ඉවරයි", "කෝපි ඉවරයි", "වතුර නෑ", "විදුලිය නෑ"];

  return (
    <div ref={pageRef}>
      <h1 className="orders-title">Orders</h1>

      {userRole !== "Shop" && (
        <button className="back-btn" onClick={handleBack}>
          Back
        </button>
      )}
      
      
      {acceptSuccessMessage && (
        <div className="alert alert-success">{acceptSuccessMessage}</div>
      )}
      {cancelSuccessMessage && (
        <div className="alert alert-success">{cancelSuccessMessage}</div>
      )}

      {/* Display item cards for Shop users */}
      {userRole === "Shop" && (
       <div className="item-cards-container mb-3"  >
       {items.map((item) => (
         <div key={item.id} className="item-card">
           <h2>{item.name}</h2>
           <img src={item.imageUrl} alt={item.name} className="item-image" />
           <h2 className="mt-3">{teaCount[item.name]}</h2>
         </div>
       ))}
     </div>     
      )}


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Ordered On</StyledTableCell>
              <StyledTableCell align="right">Order By</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <StyledTableRow key={order._id} isCompleted={order.isCompleted} isCanceled={order.isCanceled} >
                  <StyledTableCell component="th" scope="row">
                    {order.name || "Unknown Order"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{order.quantity}</StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(order.createdAt).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {`${order?.userId?.firstName} ${order?.userId?.lastName} (${order?.userId?.role})`}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* Cancel button logic */}
                    {!order.isCompleted && !order.isAccepted &&  !order?.isCanceled &&(
                     <button
                     className="cancel-btn bg-color-6"
                     onClick={() => {
                       setOrderIdToCancel(order._id); // Set the order ID to be canceled
                       setShowModal(true); // Show the cancel modal
                     }}
                   >
                     <img 
                       src={cancelIcon} // Replace with your icon path
                       alt="Cancel" 
                       style={{ 
                         width: '20px', // Adjust size as needed
                         marginRight: '8px',
                          filter: 'invert(1)'
                          // Space between icon and text
                       }} 
                     />
                     {/* Cancel */}
                   </button>
                    )}

                    {/* Accept button logic */}
                    {userRole === "Shop" && !order.isAccepted && !order?.isCanceled && (
  <button
    className="accept-btn bg-color-6"
    onClick={() => handleOrderAction(order._id, "accept")}
  >
    <img src={acceptIcon} alt="Accept" style={{ width: '20px', marginRight: '8px',  filter: 'invert(1)'}} />
    {/* Accept */}
  </button>
)}

                    {/* Done button logic */}
                    {userRole === "Shop" && order.isAccepted && !order.isCompleted && (
                      <button
                        className="done-button bg-color-6"
                        onClick={() => handleOrderAction(order._id, "done")}
                      >
                        {/* Done */}
                        <img src={doneIcon} alt="Accept" style={{ width: '20px', marginRight: '8px',  filter: 'invert(1)'}} />
    {/* Accept */}
  </button>
)}

                     {order.isCanceled && (
  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
    {order.isCanceledByUser && !order.cancelReason
      ? "Order Canceled by User"
      : order.cancelReason
      }
  </span>
)}


{/* {isCanceledByUser[order._id] && (
  <span style={{ color: "#FF0000", fontWeight: "bold" }}>
    Order Canceled by User
  </span>
)} */}

                    {/* Display accepted status for normal users */}
                    {order.isAccepted && !order.isCompleted && userRole !== "Shop" && (
                      <span style={{ color: "#5B3D21", fontWeight: "bold" }}>
                        Order Accepted
                      </span>
                    )}

                    {/* Display completed status */}
                    {order.isCompleted && (
                      <span style={{ color: "#5B3D21", fontWeight: "bold" }}>
                        Order Completed
                      </span>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No orders available.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal show={showModal} onHide={() => { setShowModal(false); setSelectedOption(""); }}  className={userRole === "Shop" ? "modal-padding" : ""}>

        <Modal.Header closeButton>
          <Modal.Title>Are You Sure Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>



        { userRole == "Shop" ? <>

          <h7>ඕඩර් එක අවලංගු කිරීමට ආසන්නතම හේතුව කුමක්ද?</h7>
            <div>
              <label>
                <input
                  type="radio"
                  value="සීනි ඉවරයි"
                  checked={selectedOption === "සීනි ඉවරයි"}
                  onChange={() => setSelectedOption("සීනි ඉවරයි")}
                />
                සීනි ඉවරයි
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="පිටි ඉවරයි"
                  checked={selectedOption === "පිටි ඉවරයි"}
                  onChange={() => setSelectedOption("පිටි ඉවරයි")}
                />
                පිටි ඉවරයි
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="තේ කොල ඉවරයි"
                  checked={selectedOption === "තේ කොල ඉවරයි"}
                  onChange={() => setSelectedOption("තේ කොල ඉවරයි")}
                />
                තේ කොල ඉවරයි
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="කෝපි ඉවරයි"
                  checked={selectedOption === "කෝපි ඉවරයි"}
                  onChange={() => setSelectedOption("කෝපි ඉවරයි")}
                />
                කෝපි ඉවරයි
              </label>
            </div>
            {/* New radio buttons */}
            <div>
              <label>
                <input
                  type="radio"
                  value="වතුර නෑ"
                  checked={selectedOption === "වතුර නෑ"}
                  onChange={() => setSelectedOption("වතුර නෑ")}
                />
                වතුර නෑ
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="විදුලිය නෑ"
                  checked={selectedOption === "විදුලිය නෑ"}
                  onChange={() => setSelectedOption("විදුලිය නෑ")}
                />
                විදුලිය නෑ
              </label>
            </div>

        
        
        </>: <></>  }


          




          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
  variant="danger"
  onClick={() => {
    if (isCanceledByUser) {
      handleOrderAction(orderIdToCancel, "cancel", isCanceledByUser);
      setShowModal(false);
    } else {
      // alert("Please select a cancellation reason.");
    }
  }}
>
  Confirm
</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
