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
  adapter: MongoDBAdapter(await clientPromise), // ✅ Ensuring Adapter is Used
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
      async authorize(credentials) {
        try {
          console.log("Authorize function triggered!");
          await connectMongoose();

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordOk = bcrypt.compareSync(credentials.password, user.password);
          if (!passwordOk) {
            throw new Error("Invalid credentials");
          }

          return { id: user._id, email: user.email };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongoose();
  
      if (account.provider === "google") {
        let existingUser = await User.findOne({ email: user.email });
  
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
          });
        }
  
        const existingAccount = await mongoose.connection.db.collection("accounts").findOne({
          provider: "google",
          userId: existingUser._id.toString(),
        });
  
        if (!existingAccount) {
          await mongoose.connection.db.collection("accounts").insertOne({
            userId: existingUser._id.toString(),
            provider: "google",
            providerAccountId: profile.sub, // Google Account ID
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            id_token: account.id_token,
            scope: account.scope,
          });
        }
  
        return true; 
      }
      return true;
    },
  }
  
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
