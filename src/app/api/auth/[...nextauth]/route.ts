import NextAuth, { type NextAuthOptions, type DefaultSession, type User } from "next-auth"
import { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { medusaClient } from "@/lib/medusa"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        try {
          const { customer } = await medusaClient.auth.authenticate({
            email: credentials.email,
            password: credentials.password,
          })

          if (!customer) {
            throw new Error("Invalid credentials")
          }

          return {
            id: customer.id,
            email: customer.email,
            name: `${customer.first_name} ${customer.last_name}`,
          }
        } catch (error) {
          throw new Error("Invalid credentials")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 