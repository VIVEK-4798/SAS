import mongoose from "mongoose";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from '../../../models/user';

console.log("NextAuth handler is being accessed");

const handler = NextAuth({
  secret: process.env.SECRET,
  debug: true,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          id: 'Credentials',
          credentials: {
            username: { label: "Email", type: "email", placeholder: "example123@gmail.com" },
            password: { label: "Password", type: "password" }
          },

          async authorize(credentials, req) {
            console.log("Authorize triggered with credentials:", credentials);
          
            const { email, password } = credentials;
          
            // Connect to the database
            await mongoose.connect(process.env.MONGO_URL);
          
            const user = await User.findOne({ email });
            if (!user) {
              console.error("User not found");
              throw new Error("User not found");
            }
          
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
              console.error("Invalid password");
              throw new Error("Invalid credentials");
            }
          
            console.log("User authorized:", user);
            return { id: user._id, email: user.email };
          }
          
        })
      ],
      pages:{
        signIn: "/login"
      }
});

export {handler as GET, handler as POST}
