import mongoose from "mongoose";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../../../libs/sendWelcomeEmail";

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
      provider: "credentials",
    });

    try {
      await sendWelcomeEmail(email);
      console.log("Welcome email sent successfully.");
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }

    return Response.json({ success: true, user: createdUser });

  } catch (err) {
    if (err?.code === 11000 && err?.keyPattern?.email) {
      return Response.json(
        { error: "User already exists with this email." },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
