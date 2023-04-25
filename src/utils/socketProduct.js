const  {ProductManagerFile}  = require("../components/ProductManagerFile")
const {socket} = require ("socket.io")

const ProductManager = new ProductManagerFile()

const socketProduct = async (io) => {
   const products = await ProductManager.getProducts()
   io.on('connection', socket => {
    console.log('Cliente conectado')
    socket.emit('productos', products)
   })
}

module.exports = {
    socketProduct
}