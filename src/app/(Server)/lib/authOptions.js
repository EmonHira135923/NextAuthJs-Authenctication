import { getUsers } from "@/app/(Server)/lib/connectDB";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  // providers
  providers: [
    // Name and Email and password
    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",

      //   form inputs
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const userCollection = await getUsers();

        // Find User
        const user = await userCollection.findOne({ email });
        if (!user) return null;

        console.log(user);

        // password Check
        const okPassword = await bcrypt.compare(password, user.password);

        if (okPassword) {
          return user;
        }

        //    my own logic
        return null;
      },
    }),
    // GoogleProvider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Github Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // google Provider

  // Callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const userCollection = await getUsers();

        if (!user?.email) {
          return false;
        }

        // ১. চেক করুন ইউজার আগে থেকেই আছে কি না (শুধুমাত্র ইমেইল দিয়ে চেক করা নিরাপদ)
        const isExist = await userCollection.findOne({ email: user.email });

        if (!isExist) {
          // ২. নতুন ইউজার হলে ডাটাবেজে সেভ করুন
          const payload = {
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId,
            role: "user",
            createdAt: new Date(), // ISOString এর চেয়ে Date অবজেক্ট কুয়েরি করার জন্য ভালো
          };

          await userCollection.insertOne(payload);
          console.log("New user created in DB");
        } else {
          // ৩. ইউজার যদি থাকে, চাইলে তার লাস্ট লগইন টাইম আপডেট করতে পারেন
          await userCollection.updateOne(
            { email: user.email },
            { $set: { lastLogin: new Date(), provider: account.provider } },
          );
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};
