const fs = require("fs");

const path = './src/mockDB/Cart.json'


class CartManager{
    constructor(){
        this.path = path
    }

    readCart = async () => {
        try {
            const data = await fs.promises.readCart(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)            
        } catch (error) {
            return []
        }
        
    }

    getCarts = async () => {
        try {
            return await this.readCart()
        } catch (error) {
            return 'No se hay productos'
        }
    }

    getCartById = async (id) => {
      try {
          const carts = await this.readCart()
          return carts.find(cart => cart.id === id)                     
      } catch (error) {
          return  new Error(error)
      }
  }

    addCart = async (newCart) => {
      try {   
          
          let carts = await this.readCart()
          const cartsDb = carts.find(cart => cart.code === newCart.code)
          console.log(cartsDb)
          if (cartsDb) {
              return `Se encuenta el producto`
          }

  
         
          if (carts.length === 0 ) {
              newCart.id = 1
              carts.push(newCart) 
          } else {
              carts =  [...carts, {...newCart, id: carts[carts.length - 1].id + 1 } ]
          }

          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')

          return 'Carrito Agragado'
      } catch (error) {
          return new Error(error)
      }
  }
  }    
  module.exports = {
    CartManager
  }