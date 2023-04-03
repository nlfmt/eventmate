import NextAuth from "next-auth";
import { authOptions } from "@/server/nextauth";

export default NextAuth(authOptions);
