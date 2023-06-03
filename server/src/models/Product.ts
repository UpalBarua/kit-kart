import mongoose, { Schema } from 'mongoose';

const validateImgUrl = (value: string) => {
  const regex = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/;
  return regex.test(value);
};

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      validate: [validateImgUrl, 'Please provide a valid image URL'],
    },
    ratingAvg: {
      type: String,
      required: true,
      default: 1.0,
    },
    reviewsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    salesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    seller: {
      type: String,
      required: true,
      default: 'kit kart',
    },
    description: {
      main: {
        type: String,
        required: true,
      },
      list: {
        type: [String],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
