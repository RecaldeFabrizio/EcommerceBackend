const {connect} = require('mongoose')
const { commander } = require('../utils/commander.js')
const dotenv = require('dotenv')


const { mode } = commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development': './.env.production'
})


let url = process.env.MONGO_URL_LOCAL

module.exports = {
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    connectDB: () => {
        try {
            connect(url)
            console.log('Base de datos conectadas')
        } catch (error) {
            console.log(error)
        }
    }
}
