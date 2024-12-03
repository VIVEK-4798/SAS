import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from '../../../models/user';
// import bcrypt from ''

const handler = NextAuth({
  secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const {email, password} = credentials;

            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({email});
            const passwordOk = user && bcrypt.CompareSync(password, user.password);            
            
            if(passwordOk){
              return user;
            }
            return null
          }
        })
      ]
});

export { }