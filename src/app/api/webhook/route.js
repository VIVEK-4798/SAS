const stripe = require('stripe')(process.env.STRIPE_SK);
// import {buffer} from 'micro';

export async function POST(req){
    console.log("Webhook received!");
    const sig = req.headers.get('stripe-signature');
    let event;

    try{
        const reqBuffer = await req.text();
        const signSecret = process.env.STRIPE_SIGN_SECRET;
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    }catch(e) {
        console.error('stripe error');
        console.log(e);
        return Response.json(e, {status: 400});
    }

    console.log('event haha:', event);
    
    // if(event.type === 'checkout.session.completed'){
    //     console.log(event);
    //     console.log({'orderId': event?.metadata?.orderId});
    // }    
    return Response.json('ok', {status: 200});
}