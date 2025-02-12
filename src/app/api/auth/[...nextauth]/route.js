import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect";
import { User } from "../../../models/user";
import bcrypt from "bcryptjs";

async function connectMongoose() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongoose connected");
  }
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  adapter: MongoDBAdapter(await clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("Authorize function triggered!");

          await connectMongoose(); 

          const email = credentials?.email;
          const password = credentials?.password;

          const user = await User.findOne({ email });
          console.log("User fetched:", user);

          if (!user) {
            console.error("User not found");
            throw new Error("User not found");
          }

          const passwordOk = bcrypt.compareSync(password, user.password);
          if (!passwordOk) {
            console.error("Invalid credentials");
            throw new Error("Invalid credentials");
          }

          console.log("User authenticated:", user);
          return { id: user._id, email: user.email };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      },     
    }),
  ],
  pages: { signIn: "/login" },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
