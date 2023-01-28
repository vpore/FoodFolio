import express from 'express';

import { createItem, getItems, checkExpiration, deleteItem } from '../controllers/item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createItem);
router.get('/', auth, getItems);
router.get('/checkexp', auth, checkExpiration);
router.delete('/:id', auth, deleteItem);

export default router;