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

// router.post('/', async (req: Request, res: Response) => {
//   const wishlist = await Wishlist.create({
//     userEmail: 'upal@mail.com',
//     wishlist: ['646dcb8c7e9eeea0720850a6'],
//   });

//   res.json(wishlist);
// });

router.put('/', async (req: Request, res: Response) => {
  const { email, productId } = req.query;

  try {
    const wishlist = await Wishlist.findOne({ userEmail: email }).populate(
      'products'
    );

    if (!wishlist || Object.keys(wishlist).length === 0) {
      const newWishlist = Wishlist.create({
        userEmail: email,
        products: [productId],
      });
      return res.status(201).json(newWishlist);
    }

    const existingProduct = wishlist.products.find(
      (product) => product?._id === productId
    );

    if (existingProduct) {
      wishlist.products = wishlist.filter(
        (product) => product?._id !== productId
      );
      const updatedWishlist = wishlist.save();
      return res.status(200).json(updatedWishlist);
    }

    wishlist.products.push(productId);
    const createdWishlist = await wishlist.save();
    res.status(201).json(createdWishlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
