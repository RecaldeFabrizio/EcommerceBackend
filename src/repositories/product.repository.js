class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getProducts(){
        return this.dao.get()
    }
    getProduct(pid){
        return this.dao.getById(pid)
    }
    createProduct(newProduct){
        return this.dao.create(newProduct)
    }
    updateProduct(){}
    deleteProduct(){}
}

module.exports = ProductRepository
