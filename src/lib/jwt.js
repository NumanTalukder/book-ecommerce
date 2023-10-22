import jwt from 'jsonwebtoken'
import { decode } from 'next-auth/jwt'

export function signJwtToken(payload, options = {}) {
  const secret = process.env.NEXTAUTH_SECRET
  const token = jwt.sign(payload, secret, options)

  return token
}

export async function verifyJwtToken(sesstionToken) {
  try {
    const decoded = decode({
      token: sesstionToken,
      secret: process.env.NEXTAUTH_SECRET,
    })
    return decoded
  } catch (error) {
    console.error(error)
    return
  }
}
