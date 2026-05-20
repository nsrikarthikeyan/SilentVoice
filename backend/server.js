const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("SilentVoice Backend Running ✅");
});

// Socket.io - Interview Room Logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join interview room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Send translated sign text to HR
  socket.on("sign-translation", ({ roomId, text }) => {
    socket.to(roomId).emit("receive-translation", text);
  });

  // WebRTC signaling
  socket.on("offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SilentVoice Server running on port ${PORT}`);
});