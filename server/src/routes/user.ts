import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const users = await User.find({});

//     if (users.length === 0) {
//       return res.status(404).json({ message: 'No user found' });
//     }

//     res.status(200).json(users);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get('/', async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    if (!body.email || !body.userName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.create(body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

// router.post('/cart', async (req: Request, res: Response) => {
//   const { query, body } = req;

//   try {
//     const currentCart = await User.find({ email: query?.email });
//     console.log(currentCart);
//   } catch (error: any) {
//     res.status(500).json({ message: error?.message });
//   }
// });

export default router;
