import { Router, Request, Response } from 'express';
import Wishlist from '../models/Wishlist';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const wishlist = await Wishlist.findOne({ userEmail: email }).populate(
      'products'
    );

    if (!wishlist || Object.keys(wishlist).length === 0) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  const { email, productId } = req.query;

  if (!email || !productId) {
    return res.status(400).json({ message: 'email or productId invalid' });
  }

  try {
    const wishlist = await Wishlist.findOne({ userEmail: email }).populate(
      'products'
    );

    if (!wishlist) {
      const newWishlist = await Wishlist.create({
        userEmail: email,
        products: [productId],
      });

      return res.status(201).json(newWishlist);
    }

    const existingProduct = wishlist.products.find(
      ({ _id }: any) => '' + _id === productId
    );

    if (existingProduct && Object.keys(existingProduct).length !== 0) {
      wishlist.products = wishlist.products.filter(
        ({ _id }: any) => '' + _id !== productId
      );
      const newWishlist = await wishlist.save();
      return res.status(200).json(newWishlist);
    }

    wishlist.products.push(productId as any);
    // wishlist.products = [...wishlist.products, productId];
    const newWishlist = await wishlist.save();
    res.status(200).json(newWishlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
