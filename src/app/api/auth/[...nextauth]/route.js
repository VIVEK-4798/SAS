import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("✅ NextAuth API Route Loaded"); 

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

        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Missing email or password!");
          throw new Error("Missing email or password");
        }

        console.log("📧 Received Email:", credentials.email);
        console.log("🔑 Received Password:", credentials.password ? "Present" : "Missing");

        // Simulating user authentication (Replace this with DB validation)
        if (credentials.email === "marry@gmail.com" && credentials.password === "marry123") {
          const user = { id: "12345", email: credentials.email };
          console.log("✅ User authenticated:", user);
          return user;  // ✅ Ensure this user object is returned
        } else {
          console.error("❌ Invalid credentials");
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
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
  }  
  ,
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
