/*
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-03-08 14:28:38
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 14:50:36
 * @Description: 
 */
const express = require('express')
const { WebSocketServer } = require('ws')
const geolib = require('geolib')

const app = express();
const PORT = 4000;

// Store driver locations
let drivers = {};

// Create WebSocket server
const wss = new WebSocketServer({ port: 8080 });


const findNearbyDrivers = (userLat, userLon) => {
  return Object.entries(drivers)
    .filter(([id, location]) => {
      const distance = geolib.getDistance(
        { latitude: userLat, longitude: userLon },
        location
      );
      return distance <= 5000; // 5 kilometers
    })
    .map(([id, location]) => ({ id, ...location }));
}

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Received message:", data); // Debugging line
      if (data.type === 'locationUpdate' && data.role === 'driver') {
        drivers[data.driver] = {
          latitude: data.data.latitude,
          longitude: data.data.longitude,
        };
        console.log("Updated driver location:", drivers[data.driver]); // Debugging line
      }
      if (data.type === 'requestRide' && data.role === 'user') {
        console.log("Requesting ride...");
        const nearbyDrivers = findNearbyDrivers(data.latitude, data.longitude);
        ws.send(
          JSON.stringify({ type: "nearbyDrivers", drivers: nearbyDrivers })
        );
      }
    } catch (error) {
      console.log("Failed to parse WebSocket message:", error);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});