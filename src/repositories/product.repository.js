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
    updateProduct(pid,updateProduct){
        return this.dao.update({_id: pid}, updateProduct)
    }
    deleteProduct(pid){
        return this.dao.delete(pid)
    }
}

module.exports = ProductRepository
