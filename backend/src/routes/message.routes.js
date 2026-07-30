import express from "express";
import { getUsersForSidebar } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getConversationsForSidebar } from "../controllers/message.controller.js";
import { getMessages } from "../controllers/message.controller.js";
import { upload } from "../middleware/upload.middleware.js"
import { sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.use(protectRoute);

router.get("/conversations", getConversationsForSidebar);
router.get("/users" , getUsersForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media"), sendMessage);

export default router;
