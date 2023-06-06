import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (req, res) => {
  const { search } = req.query;

  try {
    const products = await Product.find({
      title: { $regex: new RegExp(search + '', 'i') },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

// TODO - refactor
router.get('/:id', async (req, res) => {
  const { params } = req;

  try {
    const product = await Product.findById(params.id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

export default router;
