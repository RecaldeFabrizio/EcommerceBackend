const {Schema, model} = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    pid: {
        type: String,
        unique: true,
        required: true
    },
    cantidad: { 
        type: Number,
        required: true
    },
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}
