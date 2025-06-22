import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  provider: { type: String, required: true },
  providerAccountId: String,
  password: { type: String },
  image: { type: String },
}, {
  timestamps: true, 
});

UserSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const User = models?.User || model('User', UserSchema);
