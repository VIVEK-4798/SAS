import { Coupon } from "@/app/models/Coupon";
import mongoose from "mongoose";
import { isAdmin } from "../../../libs/authUtils";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, discountAmount } = await req.json();
  if (await isAdmin()) {
    const couponDoc = await Coupon.create({ name, discountAmount });
    return Response.json(couponDoc);
  } else {
    return Response.json({}, { status: 401 });
  }
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { _id, name, discountAmount } = await req.json();
  if (await isAdmin()) {
    await Coupon.updateOne({ _id }, { name, discountAmount });
  }
  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Coupon.find());
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Coupon.deleteOne({ _id });
  }
  return Response.json(true);
}