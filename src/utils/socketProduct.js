const {socket} = require ("socket.io")
const ProductManagers = require("../controller/ProductSocket")


const ProductManager = new ProductManagers()

const socketProduct = async (io) => {
   const products = await ProductManager.readProduct()
   io.on('connection', socket => {
    console.log('Cliente conectado')
    socket.emit('productos', products)
   })
}

module.exports = {
    socketProduct
}