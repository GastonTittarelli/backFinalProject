import Stripe from 'stripe'
import  config  from '../config/libreria.config.js'

const stripe = new Stripe(config.STRIPE_PRIVATE_KEY)

export const createSession = async (req, res) => {
    const session1 = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data:{
                    product_data:{
                        name: "Laptop",
                        description: "Gaming Laptop",
                    },
                    currency: "usd",
                    unit_amount: 20000, //200.00
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url:`${config.URL_BASE}/success`,
        cancel_url: `${config.URL_BASE}/cancel`,
    })
    return res.json(session1)
}
