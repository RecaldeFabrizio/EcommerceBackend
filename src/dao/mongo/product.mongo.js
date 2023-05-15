const { productModel } = require("../../dao/mongo/models/product.model.js")

class ProductManagerMongo {
    
    async getProducts(){
        try{
            return await productModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getProductById(pid){
        try {            
            return await productModel.findOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }

    }
    async addProduct(newProduct){
        try {
            
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }
    async updateProduct(pid, updatedProduct) {
        try {
          
          const updated = await productModel.updateOne(pid, updatedProduct, { new: true, });
      
          if (!updated) {
            return "Product not found";
          }
      
          return updated;
        } catch (error) {
          return new Error(error);
        }
      }
    async deleteProduct(pid){
        try {
            await productModel.deleteOne({_id: pid});
            return "Product deleted successfully";
        } catch (error) {
            return new Error(error);
        }
    }
}

 module.exports = new ProductManagerMongo
