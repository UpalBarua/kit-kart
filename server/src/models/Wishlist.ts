import mongoose, { Schema } from 'mongoose';

const wishlistSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
});

export default mongoose.model('Wishlist', wishlistSchema);
