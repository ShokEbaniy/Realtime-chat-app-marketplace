import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import authRouters from "./routers/auth.route.js";
import cookieParser from "cookie-parser";
import productRouter from "./routers/product.route.js";
import messageRouter from "./routers/message.route.js";
import cors from "cors";
import { app, server } from "./config/socket.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, "../../Frontend/merncrashcourse/dist");

connectDB();
// Добавь limit: "10mb" (или больше)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRouters);
app.use("/api/chats", messageRouter);
app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
