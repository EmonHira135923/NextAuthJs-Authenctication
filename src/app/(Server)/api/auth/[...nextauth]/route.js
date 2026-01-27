import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
  { name: "hello", password: "1234" },
  { name: "dummy", password: "5678" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Password",

      //   form inputs
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        // Find User
        const user = userList.find((u) => u.name == username);
        if (!user) return null;

        // password Check
        const okPassword = user.password == password;

        if (okPassword) {
          return user;
        }

        //    my own logic
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
