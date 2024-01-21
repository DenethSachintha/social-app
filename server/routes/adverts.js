import express from "express";
import { getFeedAdverts, getUserAdverts } from "../controllers/advert.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedAdverts);
//router.get("/",  getFeedAdverts);
router.get("/:userId/adverts", verifyToken, getUserAdverts);

/* UPDATE */
//router.patch("/:id/like", verifyToken, likePost);

export default router;