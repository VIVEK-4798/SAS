const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  streetAddress: String,
  zipCode: String,
  city: String,
  country: String,
  cartProducts: Object,
  paid: { type: Boolean, default: false },
  couponDiscount: { type: Number, default: 0 }, 
  totalAmount: { type: Number, required: true }, 
  paymentMethod: { type: String, enum: ['COD', 'online'], required: true }, // Optional
}, { timestamps: true });

export const Order = models?.Order || model('Order', OrderSchema);
