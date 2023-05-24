import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
