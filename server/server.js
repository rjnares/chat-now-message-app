// Create HTTP Server (for API URL Endpoints)
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// Integrate Socket.IO and enable Cross-Origin Resource Sharing (CORS)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Simple route handler to test if server
// is running on localhost:5000
app.get("/", (req, res) => {
  res.send("<h1>Hello Server</h1>");
});

// Listen on the 'connection' event for incoming sockets
io.on("connection", (socket) => {
  // Retrieve ID of connected user from socket
  const id = socket.handshake.query.id;

  // Subscribe socket of connected user to its own room channel
  // (which is simply their user ID) and log connected user
  socket.join(id);
  console.log(`Connected UID: ${id}`);

  // Broadcast sent message to all sockets (I THINK)
  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });

  // On disconnect, sockets leave all channels automatically
  socket.on("disconnect", () => {
    console.log(`Disconnected UID: ${id}`);
  });
});

// Set server to listen on localhost:5000
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
