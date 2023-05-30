const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'carts'

const cartSchema = new Schema({
    cart: [{
        product:{
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
        quantity: Number,
    }]
})

cartSchema.plugin(mongoosePaginate)
cartSchema.pre('findOne', function(){
    this.populate('cart.product')
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}
