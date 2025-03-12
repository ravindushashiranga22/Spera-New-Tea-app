const WebSocket = require('ws');

let wss;

function setupWebSocket(server) {
    try {
        // Initialize WebSocket server
        wss = new WebSocket.Server({ server });
        
        wss.on('connection', function connection(ws) {
            console.log('A new order processing connection established');
            
            // Send welcome message to new client
            try {
                ws.send(JSON.stringify({ 
                    type: "new-order-reload",
                    message: 'Start making a new order' 
                }));
            } catch (error) {
                console.error('Error sending welcome message:', error);
            }

            // Handle incoming messages
            ws.on('message', function incoming(message) {
                try {
                    console.log('Received message:', message.toString());
                    // Echo back the received message
                    ws.send(JSON.stringify({
                        type: "message-received",
                        message: message.toString()
                    }));
                } catch (error) {
                    console.error('Error handling incoming message:', error);
                }
            });

            // Handle client disconnection
            ws.on('close', function close() {
                console.log('Client disconnected');
            });

            // Handle errors
            ws.on('error', function error(err) {
                console.error('WebSocket error:', err);
            });
        });

    } catch (error) {
        console.error('Error setting up WebSocket server:', error);
        throw error;
    }
}

function emitMessageToClients(sendObj) {
    if (!wss) {
        console.error('WebSocket server not initialized.');
        return;
    }

    try {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(sendObj));
            }
        });
    } catch (error) {
        console.error('Error broadcasting message to clients:', error);
    }
}

module.exports = {
    setupWebSocket,
    emitMessageToClients
};