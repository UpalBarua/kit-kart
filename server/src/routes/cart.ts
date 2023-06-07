import { Router, Request, Response } from 'express';
import Cart from '../models/Cart';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const cart = await Cart.findOne({ userEmail: email }).populate(
      'products.product'
    );
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  const { query, body } = req;

  try {
    const existingCart = await Cart.findOne({ userEmail: query?.email });

    if (existingCart) {
      existingCart.products = body.products;
      const updatedCart = await existingCart.save();
      return res.status(200).json(updatedCart);
    }

    const newCart = new Cart({
      userEmail: query?.email,
      products: body.products,
    });

    const createdCart = await newCart.save();
    res.status(201).json(createdCart);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { email, id, quantity } = req.query;

  try {
    const result = await Cart.findOneAndUpdate(
      { userEmail: email, 'products._id': id },
      {
        $set: {
          'products.$.quantity': quantity,
        },
      },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
