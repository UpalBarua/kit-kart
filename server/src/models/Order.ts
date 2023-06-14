import mongoose, { Schema, mongo } from 'mongoose';

const OrderSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orders: [Object],
  isShipped: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Order', OrderSchema);
