import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import Product from './product'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/products', Product);

export default router;
