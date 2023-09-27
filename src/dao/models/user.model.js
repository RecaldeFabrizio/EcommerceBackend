const {Schema, model} = require('mongoose')
//const mongoosePaginate = require('mongoose-paginate-v2')
const collection = 'user'
const userSchema = new Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    //full_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
})


//userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

module.exports = {
    userModel
}