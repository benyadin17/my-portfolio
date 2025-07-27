import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "./userstore";
import { AuthOptions, Session } from "next-auth";

// Tambahan extend session (boleh juga ditaruh di global.d.ts)
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = findUserByEmail(credentials.email);
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      session.user = {
        ...session.user,
        id: token.sub,
      };
      return session;
    },
  },
};
