const { productModel } = require("../models/product.model.js")


class ProductDaoMongo{
    constructor() {
        this.productModel = productModel
    }

    async get(/* page = 1 */){
        return await this.productModel.find({}/* , {page, lean: true} */)
    }

    async getById(pid){
        return await this.productModel.find({_id: pid})
    }

    async create(newProduct){
        return await this.productModel.create(newProduct)
    }

    async update(pid, updateProduct){
        return await this.productModel.findOneAndUpdate({_id: pid}, updateProduct)
    }

    async delete(pid){
        return await this.productModel.findOneAndDelete({_id: pid})
    }
}

module.exports = ProductDaoMongo