import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectionToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectionToDB();
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString(); // Use sessionUser._id instead of session._id
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectionToDB();
        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
          const newUser = {
            email: profile?.email,
            username: profile?.name.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          };
          await User.create(newUser);
        }

        return true;
      } catch (error) {
        console.log("DB Connection Error");
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
