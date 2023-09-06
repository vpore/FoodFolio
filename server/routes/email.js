import express from "express";

import SendEmail from "../api/SendEmail.js";

const router = express.Router();

router.get('/', SendEmail);

export default router;