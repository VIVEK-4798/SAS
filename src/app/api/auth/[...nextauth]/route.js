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
  session: { strategy: "jwt" },  // ✅ Use JWT instead of DB for session storage
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
        await connectMongoose();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("User not found or password missing");
        }

        const passwordOk = bcrypt.compareSync(credentials.password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid credentials");
        }

        return { id: user._id, email: user.email, name: user.name };  // ✅ Ensure name is included
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;  // ✅ Include user info in JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;  // ✅ Ensure session contains user details
      }
      return session;
    }
  },
  pages: { signIn: "/login" }
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
