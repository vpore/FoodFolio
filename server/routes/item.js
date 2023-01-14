import express from 'express';

import { createItem, getItems } from '../controllers/item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createItem);
router.get('/', getItems);

export default router;