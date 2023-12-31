// Server-side code (Node.js)
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let currentPlayer = 'X';

wss.on('connection', ws => {
  ws.on('message', message => {
    // Broadcast the move to all connected clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  });
});
