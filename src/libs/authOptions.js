import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../libs/sendWelcomeEmail";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
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

        return { id: user._id, email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login"
  },

  events: {
    async createUser({ user }) {
      try {
        console.log("New user created via Google:", user.email);
        await sendWelcomeEmail(user.email);
        console.log("Welcome email sent to Google user.");
      } catch (err) {
        console.error("Failed to send welcome email to Google user:", err);
      }
    }
  }
};
