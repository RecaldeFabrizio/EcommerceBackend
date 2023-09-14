const { Router } = require('express')
const { PaymentsService } = require('../service/payments.service.js')

const router = Router()


const products = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 },
    { id: 5, name: "golosinas", price: 800 }
]


router.post('/payment-intents', async (req, res)=>{
try {
        const productRequested = products.find(product => product.id === Number(req.query.id))
    
        if (!productRequested) return res.status(404).send({status: 'error', error: 'Product Not Found'})
    
        const paymentIntentInfo = {
            amount: productRequested.price,
            currency: 'USD',
            metadata: {
                userId: 'id.autogenerado.por.mongo',
                orderDetails: JSON.stringify({
                    [productRequested.name]: 2 
                }, null, '\t'),
                address: JSON.stringify({
                    street: 'calle de prueba',
                    postalCode: '08191',
                    externalNumber: '123456'
                },null,'\t') 
            }
        }        
    
        const service = new PaymentsService()
        let result = await service.createPaymentIntent(paymentIntentInfo)
        
        res.send({
            status: 'success',
            payload: result
        })
    
} catch (error) {
    
}})

module.exports = router
