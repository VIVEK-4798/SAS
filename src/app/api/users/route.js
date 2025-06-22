// /api/users/route.js
import { User } from "@/app/models/user";
import mongoose from "mongoose";
import { isAdmin } from "../../../libs/authUtils";

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (!(await isAdmin())) {
    return Response.json([], { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  const [users, totalUsers] = await Promise.all([
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  return Response.json({ users, totalUsers });
}
