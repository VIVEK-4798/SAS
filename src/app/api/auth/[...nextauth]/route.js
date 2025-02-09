import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "../../../models/user";

console.log("✅ NextAuth API Loaded");

export const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("🚀 Authorize function triggered!");
        console.log("📧 Received Email:", credentials?.email);
        console.log("🔑 Received Password:", credentials?.password ? "Present" : "Missing");
      
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
      
        return { id: "fake_user_id", email: credentials.email }; // Temporarily return a fake user
      }      
      ,
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
        session.user = { id: token.id, email: token.email };
      }
      console.log("📦 Session Callback After:", session);
      return session;
    },
  },
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
