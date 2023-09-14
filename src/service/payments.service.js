const Stripe = require('stripe')
require('dotenv').config()


class PaymentsService {
    constructor(){
        this.stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
    }
    createPaymentIntent = async (data)=>{
        const paymentIntent = this.stripe.paymentIntents.create(data)

        return paymentIntent
    }
}

module.exports = {PaymentsService}
