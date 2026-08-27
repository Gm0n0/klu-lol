import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";


export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user || user.banned) throw new Error("Invalid credentials or banned");

        const isValid = await bcrypt.compare(credentials.password as string, user.passwordHash);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: user.id, email: user.email, name: user.username, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        session.user.name = token.username as string;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    }
  }
});
