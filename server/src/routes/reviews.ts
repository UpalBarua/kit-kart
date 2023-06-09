import { Router, Request, Response } from 'express';
import Review from '../models/Review';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { productId } = req.query;

  if (!productId) {
    res.status(400).json({ message: 'Invalid productId' });
  }

  try {
    const reviews = await Review.find({ product: productId }).populate([
      'product',
      'user',
    ]);
    // const reviews = await Review.find({}).populate(['product', 'user']);

    if (!reviews) {
      return res.status(404).json({ message: 'Reviews not found' });
    }

    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newReview = await Review.create(body);
    res.status(201).json(newReview);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { productId } = req.query;

  try {
    const result = await Review.findOneAndDelete({ _id: productId });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
