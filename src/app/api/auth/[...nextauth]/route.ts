import { AuthOptions } from "@/lib/auth/AuthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
