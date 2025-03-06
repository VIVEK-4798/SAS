import mongoose from 'mongoose';
import { Order } from '../../models/Order';

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


    const sig = req.headers.get("stripe-signature");    
    let event;

    try {
        const reqBuffer = await req.text();

        const signSecret = process.env.STRIPE_SIGN_SECRET;
        event = stripe.webhooks.constructEvent(
            reqBuffer,
            sig,
            signSecret
        );

    } catch (err) {
        console.error("Stripe Webhook Error:", err);
        return new Response("Webhook Error", { status: 400 });
    }

    if(event.type === 'checkout.session.completed'){
        const orderId = event?.data?.object?.metadata?.orderId;
        const isPaid = event?.data?.object?.payment_status === 'paid';

        if(isPaid){
        await Order.updateOne({ _id: orderId.toString() }, { paid: true });        
        }
    }

    return new Response("ok", { status: 200 });
}
