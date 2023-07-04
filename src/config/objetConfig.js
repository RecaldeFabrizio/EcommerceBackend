const {connect} = require('mongoose')
const { commander } = require('../utils/commander.js')
const dotenv = require('dotenv')
const { MongoSingleton } = require('../utils/singleton.js')


const { mode } = commander.opts()
dotenv.config({
    path: mode === 'production' ? './.env.development': './.env.production'
})


let url = process.env.MONGO_URL_LOCAL

module.exports = {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_pass_app: process.env.GMAIL_PASS_APP,
    twilio_sid: process.env.TWILIO_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
    my_phone_number: process.env.MY_PHONE_NUMBER,
    /* connectDB: () => {
        try {
            connect(url)
            console.log('Base de datos conectadas')
        } catch (error) {
            console.log(error)
        }
    } */
    connectDB: async() =>await MongoSingleton.getInstance()
}
