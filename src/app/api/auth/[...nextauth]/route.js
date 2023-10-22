import NextAuth from 'next-auth/next'
import CredentialsProviders from 'next-auth/providers/credentials'
import User from '@/models/User'
import { signJwtToken } from '@/lib/jwt'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

const handler = NextAuth({
  providers: [
    CredentialsProviders({
      type: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'John doe' },
        username: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        await db.connect()

        const user = await User.findOne({ email })

        if (!user) {
          throw new Error('User not found!')
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
          throw new Error('Wrong Pass!')
        } else {
          const { password, ...others } = user._doc

          const accessToken = signJwtToken(others, { expiresIn: '7d' })

          return {
            ...others,
            accessToken,
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token._id = user._id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken
        session.user._id = token._id
      }

      return session
    },
  },
})

export { handler as GET, handler as POST }
