import express from "express";
import protectRoute from "../middleware/protectRoute.middleware.js";
import {
  getUsersForSideBar,
  sendMessage,
  getChatMessages,
} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);

router.get("/getChatMessages/:id", protectRoute, getChatMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
