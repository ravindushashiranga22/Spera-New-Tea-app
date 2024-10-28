const WebSocket = require('ws');
let wss;

function setupWebSocket(server) {
    wss = new WebSocket.Server({ server }); // Set up WebSocket server with the HTTP server

    wss.on('connection', function connection(ws) {
        console.log('A new order processing connection established');
        // ws.send(JSON.stringify({ type:"new-order-reload",message: 'Start making a new order' }));

        // ws.n('message', function incoming(message) {
        //     console.log('Received: %s', message);
        //     ws.send('Received: ' + message);
        // });o
    });
}

function emitMessageToClients(sendObj) {
    if (wss) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(sendObj));
            }
        });
    } else {
        console.log('WebSocket server not initialized.');
    }
}

module.exports = { setupWebSocket, emitMessageToClients };
