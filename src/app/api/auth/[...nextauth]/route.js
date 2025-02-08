import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "../../../models/user";

console.log("route.js trigred");


const handler = NextAuth({
  secret: process.env.SECRET,
  debug: true,
  session: {
    strategy: "jwt", 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("🚀 Authorize function triggered!");

          if (!credentials) {
            console.error("❌ No credentials provided!");
            throw new Error("No credentials provided");
          }

          const email = credentials?.email;
          const password = credentials?.password;

          if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URL);
            console.log("✅ Connected to MongoDB");
          }

          const user = await User.findOne({ email });
          console.log("🔍 Fetched user from DB:", user);

          if (!user) {
            console.error("❌ User not found!");
            throw new Error("User not found");
          }

          const passwordOk = bcrypt.compareSync(password, user.password);
          console.log("🔑 Password valid:", passwordOk);

          if (!passwordOk) {
            console.error("❌ Invalid password!");
            throw new Error("Invalid credentials");
          }

          console.log("✅ User authenticated:", user);
          return { id: user._id, email: user.email };

        } catch (error) {
          console.error("🔥 Authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("🔄 JWT Callback Before:", token);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log("🔄 JWT Callback After:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("📦 Session Callback Before:", session);
      if (token) {
        session.user = { id: token.id, email: token.email }; // ✅ Ensure user data is stored
      }
      console.log("📦 Session Callback After:", session);
      return session;
    },
  },  
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
