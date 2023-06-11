import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {});

const router = Router();

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  const line_items = products.map(({ product, quantity }) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          images: [product.imageUrl],
          description: product.description.main.slice(0, 20),
        },
        unit_amount: product.price * 100,
      },
      quantity,
    };
  });

  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.status(200).json({ url: session.url });
});

export default router;
