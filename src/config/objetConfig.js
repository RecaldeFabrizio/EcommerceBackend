const {connect} = require('mongoose')

let url = 'mongodb+srv://FDR98:Hesoyam123@cluster0.gkja86y.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectDB: () => {
        connect(url)
        console.log('Base de datos conectadas')
    }
}
