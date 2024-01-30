import express from "express";
import {  getChannel, getUserChannels } from "../controllers/channels.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId/channels", verifyToken, getUserChannels);
router.get("/:id", getChannel);



export default router;