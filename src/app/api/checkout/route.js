import Stripe from 'stripe'

console.log(process.env.STRIPE_PRIVATE_KEY)
// const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
const STRIPE_PRIVATE_KEY =
  'sk_test_51O6m6UJtKTGF9BrWyVgmQNVseJoYCPAAUmW5mfSn5wMvmO4Mh6hfGRBsUD5WdRyzFRSaVYuuLKRyWwJcRb5qbpvz00oTLJZwLa'
const stripe = new Stripe(STRIPE_PRIVATE_KEY)

export async function POST(req) {
  try {
    const body = await req.json()

    const session = await stripe.checkout.sessions.create({
      line_items: body,
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `/success`,
      cancel_url: `/`,
    })

    console.log(session)

    return new Response(JSON.stringify(session), { status: 200 })
  } catch (error) {
    console.log(error)
  }
}
