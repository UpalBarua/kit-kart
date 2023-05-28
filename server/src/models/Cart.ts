import mongoose, { Schema, mongo } from 'mongoose';

// TODO - replace userEmail with User ref!

const CartSchema = new Schema(
  {
    userEmail: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cart', CartSchema);
