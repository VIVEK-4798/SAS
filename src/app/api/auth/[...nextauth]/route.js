import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from '../../../../libs/mongoConnect'
import {User} from '../../../models/user';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  // adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("Authorize function triggered");
          // const { email, password } = credentials;
          
          const email = credentials?.email;
          const password = credentials?.password;

          await mongoose.connect(process.env.MONGO_URL);
          console.log("Connected to database");
      
          const user = await User.findOne({ email });
          console.log("User fetched:", user);
      
          if (!user) {
            console.error("User not found");
            throw new Error("User not found");
          }
      
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          if (!passwordOk) {
            console.error("Invalid credentials");
            throw new Error("Invalid credentials");
          }
      
          return { id: user._id, email: user.email };
        } catch (error) {
          console.error("Authorize Error:", error);
          throw error; // Rethrow to let NextAuth handle it
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
