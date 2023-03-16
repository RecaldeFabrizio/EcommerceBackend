class ProductManager {
    constructor(){
        this.products = []
    }

    static id = 0

addProduct(title, description, price, img, code, stock){
    ProductManager.id++
    this.products.push({title, description, price, img, code, stock, id:ProductManager.id});
}

getProduct() {
    return this.products;
}

getProductById(id){
    if(!this.products.find((producto)=>producto.id===id)){
            console.log("Not Found")
    }else{
        console.log("Existe")
    }
}
}


const productos = new ProductManager