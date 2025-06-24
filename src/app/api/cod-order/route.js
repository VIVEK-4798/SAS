import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../libs/authOptions";
import { Order } from "@/app/models/Order";
import { MenuItem } from "@/app/models/MenuItem";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { userInfo, cartProducts, couponDiscount } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    let totalAmount = 0;

    for (const cartProduct of cartProducts) {
      const productInfo = await MenuItem.findById(cartProduct._id);
      if (!productInfo) continue;

      let productPrice = productInfo.basePrice;

      if (cartProduct.size) {
        const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
        if (size) productPrice += size.price;
      }

      if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
          const extraInfo = productInfo.extraIngredientsPrices.find(e => e._id.toString() === extra._id.toString());
          if (extraInfo) productPrice += extraInfo.price;
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
      paymentMethod: 'COD',
      totalAmount: finalAmount,
      couponDiscount: couponDiscount || 0,
    });

    return Response.json({
      success: true,
      orderId: orderDoc._id.toString(),
    });
  } catch (err) {
    console.error("COD Order Error:", err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
