import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from '../../../models/user';

const handler = NextAuth({
  secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          id: 'Credentials',
          credentials: {
            username: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const { email, password } = credentials;
          
            await mongoose.connect(process.env.MONGO_URL);
          
            const user = await User.findOne({ email });
            if (!user) {
              console.error('User not found');
              return null;
            }
          
            const passwordOk = bcrypt.compareSync(password, user.password);
            if (passwordOk) {
              return { id: user._id, email: user.email }; // Return minimal user data
            }
          
            console.error('Invalid password');
            return null;
          }
        })
      ],
      pages:{
        signIn: "/src/app/login/page.js"
      }
});

export {handler as GET, handler as POST}