import { Router, Request, Response } from 'express';
import Order from '../models/Order';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.find({ user: id });
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    const order = await Order.create(body);
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { body } = req;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        $set: body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
    res.status(200).json(deletedOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
