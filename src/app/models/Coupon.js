import { Schema, models, model } from "mongoose";

const CouponSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    discountAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Coupon = models?.Coupon || model("Coupon", CouponSchema);