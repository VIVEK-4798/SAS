import mongoose from "mongoose";
import NextAuth from "next-auth";
import { authOptions } from '../../../../libs/authOptions';

async function connectMongoose() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
