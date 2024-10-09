import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existUser = await getGuest(user.email);
        if (!existUser)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.userId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "./login",
    signOut: "./signout",
  },
});
