import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/user';
import productsRoute from './routes/products';
import cartRoute from './routes/cart';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || '';

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);

app.use((req: Request, res: Response) =>
  res.status(404).json({ message: 'Not Found' })
);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server running' });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`[⚡server] running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`[database] connection error: ${error}`);
    process.exit(1);
  });
