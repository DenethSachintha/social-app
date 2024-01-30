import express from "express";
import { getFeedAdverts, getUserAdverts,getChannelAdverts } from "../controllers/advert.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedAdverts);
router.get("/:userId/adverts",verifyToken, getUserAdverts);
router.get("/:channelId/adverts",verifyToken, getChannelAdverts);


export default router;
