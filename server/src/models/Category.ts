import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Category', CategorySchema);
