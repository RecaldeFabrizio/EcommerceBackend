const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const collection = 'user'
const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
        
    },
    last_name: {
        type: String,
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

//userSchema.plugin(mongoosePaginate)
const userModel = model(collection, userSchema)

module.exports = {
    userModel
}