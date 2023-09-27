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
        return this.products.push({_id: pid}, updateProduct)
    }

    delete(pid){
        return this.products.push({_id:pid})
    }
}

module.exports = ProductDaoMemory