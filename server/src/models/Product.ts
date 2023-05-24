import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ratingAvg: {
    type: Number,
    required: true,
  },
  reviewsCount: {
    type: Number,
    required: true,
  },
  salesCount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  seller: {
    type: String,
    required: true,
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
});

export default mongoose.model('Product', productSchema);
