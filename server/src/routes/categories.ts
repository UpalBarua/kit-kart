import { Router, Request, Response } from 'express';
import Category from '../models/Category';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      res.status(404).json({ message: 'No categories found' });
    }

    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const result = await Category.insertMany(body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Category.deleteOne({ _id: id });
  res.json(result);
});

export default router;
