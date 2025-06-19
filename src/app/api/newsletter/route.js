// app/api/newsletter/route.js
import mongoose from 'mongoose';
import { NewsletterSubscriber } from '@/app/models/NewsletterSubscriber';

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);

  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: 'Already subscribed' }), { status: 200 });
    }

    const newSub = await NewsletterSubscriber.create({ email });
    return new Response(JSON.stringify({ success: true, subscriber: newSub }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
