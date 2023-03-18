class ProductManager {
    constructor(){
        this.products = []
    }

    static id = 0

addProduct(title, description, price, img, code, stock){
    for(let i = 0; i < this.products.length; i++){
        if(this.products[i].code === code){
            console.log(`El codigo ${code} ya a sido utilizado`);
            break;
        }
    }

    const newProduct ={ title, description, price, img, code, stock, }

    if(!Object.values(newProduct).includes(undefined)){
    ProductManager.id++
    this.products.push({ ...newProduct, id:ProductManager.id});
    }else{
        console.log("todos los campos son requeridos")
    }

    }



getProduct() {
    return this.products;
}

Existe(id){
   return this.products.find((producto) => producto.id === id)
}

getProductById(id){
    if(!this.Existe(id)){
            console.log("Not Found")
    }else{
        console.log(this.Existe(id))
    }
}
}

const productos = new ProductManager


//PRODUCTOS

productos.addProduct("produto1", "descrip1", 1000, "img1", "A1", 1000);
productos.addProduct("producto2", "descrip2", 2000, "img2", "A2");
productos.addProduct("produto3", "descrip3", 3000, "img3", "A2", 3000);

console.log(productos.getProduct());
productos.addProduct("produto3", "descrip3", 3000, "img3", "A2", 3000);


productos.getProductById(1231242)