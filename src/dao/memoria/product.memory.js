class ProductDaoMemory{
    constructor() {
        this.products = []
    }

    get(){
       return this.products
    }

    getById(pid){
       return this.products.find(product => pid === product.id)
    }

    create(newProduct){
        return this.products.push(newProduct)
    }

    update(pid, updateProduct){
        
    }

    delete(pid){
        
    }
}

module.exports = ProductDaoMemory