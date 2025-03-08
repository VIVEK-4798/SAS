import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect";
import { User } from "../../../models/user";
import bcrypt from "bcryptjs";
import { UserInfo } from "@/app/models/UserInfo";

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
      async authorize(credentials) {
        try {
            console.log("Received credentials:", credentials);
    
            await connectMongoose();
            const user = await User.findOne({ email: credentials.email });
    
            console.log("User found in DB:", user);
    
            if (!user || !user.password) {
                throw new Error("User not found or password missing");
            }
    
            // Debugging hashed password comparison
            console.log("Stored hashed password:", user.password);
            console.log("Entered password:", credentials.password);
    
            const passwordOk = bcrypt.compareSync(credentials.password, user.password);
            console.log("Password match:", passwordOk);
    
            if (!passwordOk) {
                throw new Error("Invalid credentials");
            }
    
            return { id: user._id, email: user.email };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }    
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

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
