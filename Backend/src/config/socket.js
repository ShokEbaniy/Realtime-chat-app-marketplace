import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.CLIENT_URL || "https://saveheal-store.onrender.com",
    credentials: true,
  },
  transports: ["websocket", "polling"],
  maxHttpBufferSize: 1e7,
});
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);
  console.log("Query params:", socket.handshake.query);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped user ${userId} to socket ${socket.id}`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
