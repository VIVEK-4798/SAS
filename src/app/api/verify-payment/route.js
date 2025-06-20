import crypto from 'crypto';
import mongoose from 'mongoose';
import { Order } from '@/app/models/Order';

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    await Order.findByIdAndUpdate(orderId, { paid: true });
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false });
  }
}
