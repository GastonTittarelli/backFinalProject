import Stripe from 'stripe';
const key = "sk_test_51O477tIp2I2NODgNPrWUWtMThLNSgBWMydrS2ZtP4KrcqGwgL601zt6nZxsJzakG7D1fxZ5G8le2UpYTzl3EYMBS00s8zAMxD2"

export default class PaymentService {
    constructor(){
        this.stripe = new Stripe (key)
    }

    createPaymentIntent = async(data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)

        return paymentIntent
    }
}
