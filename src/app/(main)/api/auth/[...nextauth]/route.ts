import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { findUserByEmail } from "@/lib/userstore"; 
// Extend the Session type to include id on user
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

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null;
        }

        // Pakai userStore untuk cari user
        const user = findUserByEmail(credentials.email);

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Validasi password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        console.log("Login success:", user.email);
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
