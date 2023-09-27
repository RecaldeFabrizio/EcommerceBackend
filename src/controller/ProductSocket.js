const fs = require("fs");
const {promises, as, existsSync} = fs;

module.exports = class ProductManagers {
    
    constructor(){
      this.products = []
      this.path = "./productos.json"
    }

    addProduct = async (newProduct) => {
        if(newProduct.title && newProduct.description && newProduct.price && newProduct.img && newProduct.code && newProduct.stock) {

        let ProductList = await this.readProduct()

          if(ProductList.find(prod => prod.code === newProduct.code)){
            return 'El condigo ingresado esta repetido'
          }
        
         let newProductList = [...ProductList, {id: ProductList[ProductList.length-1].id+1,...newProduct}]
         this.products = newProductList

         await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 2)) 
         return "Producto Agregado Correctamente"

        }else{
          return "Faltan Campos Requeridos"
       }

    }

    readProduct = async () => {
      if (!existsSync(this.path)) {
        return (`El Archivo ${this.path} no existe`)
      }
      let respuesta = await fs.promises.readFile(this.path, "utf-8")
      return (JSON.parse(respuesta))
    }

    getProduct = async() =>{
      let respuesta2 = await this.readProduct()
      return console.log(respuesta2)
    }

    getProductById = async(id) => {
      let respuesta3 = await this.readProduct()
      if(!respuesta3.find(prod => prod.id === id)){
        console.log("Not Found")
      }else{
        console.log(respuesta3.find(prod => prod.id === id))
      }
    }

    deleteProductById = async(id) =>{
      let respuesta3 = await this.readProduct()
      let productFilter = respuesta3.filter(prod => prod.id !==id)
      await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, 2))
    }

    updateProduct = async ({id,...updatedFields}) =>{
      let products = await this.readProduct()
      let productIndex = products. findIndex (prod => prod.id === id)
      if(productIndex === -1){
        return "Product not Found"
      } 
      let product = {...products[productIndex], ...updatedFields, id}
      products[productIndex] = product
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
      return "Producto Actulizado"
    }
  }