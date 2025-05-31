// server.js
const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static HTML
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("🔌 A user connected");

  socket.on("message", (msg) => {
    console.log("📨 Message received:", msg);
    io.emit("message", msg); // broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://your-server-ip:${PORT}`);
});
