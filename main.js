let productos = []

class ProductManager {
    constructor(){
        this.products = productos
    }


addProduct(newProduct){
        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.img || !newProduct.code || !newProduct.stock) 
        return "todos los campos son necesarios"

        let product = this.products.find(prod => prod.code === newProduct.code)
        if (product) return 'El codigo ingresado esta repetido'
            
        return this.products.push({id: this.products.length+1,...newProduct})
    }

    

getProduct() {
    return this.products;
}


getProductById(id){
    let product = this.products.find(prod => prod.id === id)
    if(!product) return 'Not Found' 
    return product
}
}

const product = new ProductManager


//PRODUCTOS

product.addProduct({title: "produto1",
description: "descrition1",
price: 1000,
img: "img1",
code: "A1",
stock:1000
})

product.addProduct({title: "produto2",
description: "descrition2",
price: 2000,
img: "img2",
code: "A2",
stock:2000
})

console.log(product.getProduct())
console.log(product.getProductById(2))