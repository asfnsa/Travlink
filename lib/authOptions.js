import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // agar username/password use karna hai to Credentials bhi add kar sakte ho
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",  // apna login page
  },
};
