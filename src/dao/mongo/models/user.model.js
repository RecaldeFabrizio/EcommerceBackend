const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const collection = 'user'
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    }
})

userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

module.exports = {
    userModel
}