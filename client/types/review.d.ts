import { User } from './user';
import { Product } from './product';

export interface Review {
  _id: string;
  user: User;
  product: Product;
  rating: number;
  comment: string;
  createdAt: string;
}
