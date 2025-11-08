const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));
app.use(express.json());

// Store house points in memory
let housePoints = {
  gryffindor: 0,
  slytherin: 0,
  hufflepuff: 0,
  ravenclaw: 0,
  hogwarts: 0
};

// Create HTTP server
const server = app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';

  // Find the local IP address
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
  }

  console.log('\n🏰 House Points Tracker Server Running!\n');
  console.log(`📺 TV Display: http://${localIP}:${PORT}/display.html`);
  console.log(`📱 Admin Panel: http://${localIP}:${PORT}/admin.html`);
  console.log(`💻 Local: http://localhost:${PORT}\n`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Broadcast to all connected clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) { // 1 = OPEN
      client.send(JSON.stringify(data));
    }
  });
}

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('✅ New client connected');

  // Send current state to new client
  ws.send(JSON.stringify({
    type: 'init',
    points: housePoints
  }));

  // Handle messages from clients
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'updatePoints') {
        const { house, points } = data;

        if (housePoints.hasOwnProperty(house)) {
          const oldPoints = housePoints[house];
          housePoints[house] += points;

          // Prevent negative points
          if (housePoints[house] < 0) {
            housePoints[house] = 0;
          }

          console.log(`${house}: ${oldPoints} → ${housePoints[house]} (${points > 0 ? '+' : ''}${points})`);

          // Broadcast update to all clients
          broadcast({
            type: 'pointsUpdated',
            house: house,
            points: housePoints[house],
            change: points
          });
        }
      } else if (data.type === 'reset') {
        // Reset all points
        Object.keys(housePoints).forEach(house => {
          housePoints[house] = 0;
        });

        console.log('🔄 All points reset to 0');

        broadcast({
          type: 'init',
          points: housePoints
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});
