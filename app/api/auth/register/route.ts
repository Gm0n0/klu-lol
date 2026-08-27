import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // or wherever your authOptions are defined

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic';