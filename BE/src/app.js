// const express = require("express");
// const signupRoute = require("./routes/Signup");
// const loginRoute = require("./routes/Login");
// const authenticatedRoute = require("./routes/Authenticated");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const orderRoutes = require("./routes/OrdersRoutes");
// const WebSocket = require('ws');
// const http = require('http'); // Import the http module

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware setup
// app.use(bodyParser.json());
// app.use(cors());

// // Routes setup
// app.use("/user", signupRoute);
// app.use("/auth", loginRoute);
// app.use("/api", authenticatedRoute);
// app.use("/order", orderRoutes);

// // Create an HTTP server using the Express app
// const server = http.createServer(app);

// // Setup WebSocket server

// // webSocketHandlers.js

// function handleIncomingMessage(sendObj) {

//     const wss = new WebSocket.Server({ server }); // Pass the HTTP server to WebSocket


//     wss.on('connection', function connection(ws) {
//         console.log('A new order processing connection established');
//         // ws.send(JSON.stringify({message:'Start making a new order'}));
    
//         // ws.on('message', function incoming(message) {
//         //     console.log('Received: %s', message);
//         //     ws.send('Received: ' + message);
//         // });
        
//         ws.on('message', function incoming(message) {
//             console.log('Received: %s', message);
//             // ws.send('Received: ' + message);
//             // JSON.stringify()
//             ws.send(JSON.stringify(sendObj))
//         });
    
//     });


  
// }





// // Start the server
// server.listen(PORT, () => {
//     console.log(`Server is running on: http://localhost:${PORT}`);
// });

// module.exports = { handleIncomingMessage };



// function handleIncomingMessage(sendObj) {

//     const wss = new WebSocket.Server({ server }); // Pass the HTTP server to WebSocket


//     wss.on('connection', function connection(ws) {
//         console.log('A new order processing connection established');
//         // ws.send(JSON.stringify({message:'Start making a new order'}));
    
//         // ws.on('message', function incoming(message) {
//         //     console.log('Received: %s', message);
//         //     ws.send('Received: ' + message);
//         // });
        
//         ws.on('message', function incoming(message) {
//             console.log('Received: %s', message);
//             // ws.send('Received: ' + message);
//             // JSON.stringify()
//             ws.send(JSON.stringify(sendObj))
//         });
    
//     });


  
// }

const express = require("express");
const signupRoute = require("./routes/Signup");
const loginRoute = require("./routes/Login");
const authenticatedRoute = require("./routes/Authenticated");
const bodyParser = require("body-parser");
const cors = require("cors");
const orderRoutes = require("./routes/OrdersRoutes");
const WebSocket = require('ws');
const http = require('http'); // Import the http module
const { setupWebSocket } = require("./services/websocketServer");
const app = express();

const {createDatabaseConnection} = require("../src/configuration/dbConfig.js");


require('dotenv').config();


const PORT = process.env.PORT;
// console.log(process.env);
// console.log(process.env.PORT);

createDatabaseConnection()

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Routes setup
app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", authenticatedRoute);
app.use("/order", orderRoutes);

// Create an HTTP server using the Express app
const server = http.createServer(app);


// Setup WebSocket server
setupWebSocket(server); 

// Setup WebSocket server
// const wss = new WebSocket.Server({ server }); // Pass the HTTP server to WebSocket

// wss.on('connection', function connection(ws) {
//     console.log('A new order processing connection established');
//     ws.send(JSON.stringify({message:'Start making a new order'}));

//     ws.on('message', function incoming(message) {
//         console.log('Received: %s', message);
//         ws.send('Received: ' + message);
//     });
// });

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});


