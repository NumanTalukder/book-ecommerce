import db from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    await db.connect()

    const { username, email, password: pass } = await req.json()

    console.log(username, email, pass)

    const isExisting = await User.findOne({ email })

    if (isExisting) {
      throw new Error('user already exists')
    }

    const hashedPass = await bcrypt.hash(pass, 10)

    const newUser = await User.create({ username, email, password: hashedPass })

    const { password, ...user } = newUser._doc

    return new Response(JSON.stringify(user), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}
