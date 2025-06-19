// app/api/contact/route.js
import mongoose from "mongoose";
import { Contact } from "@/app/models/Contact";
import { isAdmin } from "@/libs/authUtils";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "All fields required" }), { status: 400 });
  }

  try {
    const contactDoc = await Contact.create({ name, email, message });
    return Response.json({ success: true, contact: contactDoc });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);

  if (!(await isAdmin())) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  const feedback = await Contact.find().sort({ createdAt: -1 });
  return Response.json(feedback);
}
