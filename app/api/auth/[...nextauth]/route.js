import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { pool } from '../../../(common)/lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let connection;
        try {
          connection = await pool.getConnection();

          // Look up the user by email
          const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [credentials.email]);
          const user = rows[0];

          if (!user) {
            return null; // User not found
          }

          // Check if the user is active
          if (user.is_active === 0) {
            // Throw a custom error that can be caught by the login form
            throw new Error("Account is disabled.");
          }

          // Compare the provided password with the stored hashed password
          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) {
            return null; // Passwords don't match
          }

          // Return the user object if authentication succeeds
          return {
            id: user.id,
            email: user.email,
            role: user.role, // Attach the user's role here
            name: user.name, // to see name
          };
        } catch (error) {
          console.error("Authentication failed:", error);
          
          if (error.message === "Account is disabled.") {
              throw error; // Re-throw the specific error
          }
          return null;
        } finally {
          if (connection) {
            connection.release();
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name; //added tto see name
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name; // to see name
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };