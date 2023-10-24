import db from '@/lib/db'
import { verifyJwtToken } from '@/lib/jwt'
import Review from '@/models/Review'

export async function GET(req) {
  await db.connect()

  const url = new URL(req.url)
  const bookId = url.searchParams.get('bookId')
  const review = await Review.findOne({ bookId })
    .limit(16)
    .populate('userId')
    .select('-password')

  return new Response(JSON.stringify(review), { status: 200 })
}

export async function POST(req) {
  await db.connect()

  const accessToken = req.headers.get('authorization')

  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: 'unauthorized token' }), {
      status: 403,
    })
  }

  try {
    const body = await req.json()

    const newReview = Review.create(body)

    return new Response(JSON.stringify(newReview), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
