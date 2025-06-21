import mongoose from "mongoose";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    await mongoose.connect(process.env.MONGO_URL);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      provider: 'credentials', // Add this if your schema requires it
    });

    return Response.json({ success: true, user: createdUser });

  } catch (err) {
    // Handle duplicate key (email exists)
    if (err?.code === 11000 && err?.keyPattern?.email) {
      return Response.json(
        { error: "User already exists with this email." },
        { status: 409 }
      );
    }

    // Other errors
    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
