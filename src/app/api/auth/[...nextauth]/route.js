import mongoose from "mongoose";
import NextAuth from "next-auth";
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
            try {
              console.log("Authorize function triggered");
              
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
              throw error;
            }
          }
          
        })
      ],
      pages:{
        signIn: "/login"
      }
});

export {handler as GET, handler as POST}
