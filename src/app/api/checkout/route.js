import Razorpay from 'razorpay';
import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../libs/authOptions";
import { Order } from "@/app/models/Order";
import { MenuItem } from "@/app/models/MenuItem";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { userInfo, cartProducts, couponDiscount } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  let totalAmount = 0;
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;

    if (cartProduct.size) {
      const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
      productPrice += size.price;
    }

    if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        const extraInfo = productInfo.extraIngredientsPrices.find(e => e._id.toString() === extra._id.toString());
        productPrice += extraInfo.price;
      }
    }

    totalAmount += productPrice;
  }

  const finalAmount = totalAmount - (couponDiscount || 0);

  const orderDoc = await Order.create({
    userEmail,
    ...userInfo,
    cartProducts,
    paid: false,
    paymentMethod: 'online',
    totalAmount: finalAmount,
    couponDiscount: couponDiscount || 0,
  });

  const razorpayOrder = await razorpay.orders.create({
    amount: finalAmount * 100, // amount in paise
    currency: 'INR',
    receipt: orderDoc._id.toString(),
    notes: {
      orderId: orderDoc._id.toString(),
    },
  });

  return Response.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    orderId: orderDoc._id.toString(),
    userEmail,
  });
}
