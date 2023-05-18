const { cartModel } = require("../../dao/mongo/models/cart.model.js")

class CartManagerMongo {
    
    async getCart(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getCartById(cid){
        try {            
            return await cartModel.findOne({_id: cid})
        } catch (error) {
            return new Error(error)
        }

    }
    async addCart(newCart){
        try {
            
            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }   
    async updateCart(cid, updatedCart) {
        try {
          
          const updated = await cartModel.updateOne(cid, updatedCart, { new: true, });
      
          if (!updated) {
            return "Product not found";
          }
      
          return updated;
        } catch (error) {
          return new Error(error);
        }
      }
    async deleteCart(cid){
        try {
            await cartModel.deleteOne({_id: cid});
            return "Product deleted successfully";
        } catch (error) {
            return new Error(error);
        }
    }
}

 module.exports = new CartManagerMongo
