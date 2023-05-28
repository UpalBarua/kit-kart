import mongoose, { Schema } from 'mongoose';

const validateEmail = (value: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please provide a valid email address'],
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },
    // cart: [
    //   {
    //     productId: String,
    //     productQuantity: {
    //       type: Number,
    //       default: 1,
    //       min: 1,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
