import { connectDB } from "@/lib/mongodb";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { register } from "@/actions/register";

export const authOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, image, email } = user;
        try {
          await connectDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await register({ name, image, email }, account.provider);

            if (res?.error) return false;
          }

          return user;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false; // Ensure function always returns a valid response
        }
      }

      return user;
    },

    async jwt({ token, user }) {
      if (user) {
        token.name
        token.email

      }

      return token;
    },
    async session({ session, token }) {
      session.user.profile = token.profile;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };