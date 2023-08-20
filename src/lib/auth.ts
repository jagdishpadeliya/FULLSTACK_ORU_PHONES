import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID } from "crypto";
import { updateUser } from "./actions/user.actions";
import User from "./models/user.model";
import { compare } from "bcryptjs";
import { connectToDB } from "./mongoose";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};
        if (!username || !password) return null;
        await connectToDB();
        const user = await User.findOne({ email: username });
        if (!user || (!await compare(password, user.password))) return null;
        return {
          id: randomUUID(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
  secret: process.env.SECRET!,
};
