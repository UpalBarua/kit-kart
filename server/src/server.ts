import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || '';

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server running' });
});

mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server] running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
