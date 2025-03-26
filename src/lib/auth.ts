import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { medusaClient } from "./config"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { customer } = await medusaClient.auth.authenticate({
            email: credentials.email,
            password: credentials.password,
          })

          if (!customer) {
            return null
          }

          return {
            id: customer.id,
            email: customer.email,
            name: `${customer.first_name} ${customer.last_name}`.trim(),
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
} 