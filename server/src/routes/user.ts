import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await User.find({});

    // TODO: Add 404 error

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const response = await User.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

export default router;
