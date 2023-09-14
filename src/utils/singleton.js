const {connect} = require('mongoose')

class MongoSingleton {
    static #instance 
    constructor(){
        console.log(process.env.MONGO_URL_LOCAL)
        try {
        connect(process.env.MONGO_URL_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conexión a la base de datos exitosa');
        } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
    }
    static getInstance(){
        if (this.#instance) {
            console.log('Base de datos ya está creada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Base de dato Conectada')
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}
