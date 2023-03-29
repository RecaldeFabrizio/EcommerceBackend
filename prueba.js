import {promises as fs} from "fs"

class ProductManager {
    
    constructor(){
      this.products = []
      this.path = "./productos.json"
    }

    addProduct = async (newProduct) => {
        if(newProduct.title || newProduct.description || newProduct.price || newProduct.img || newProduct.code || newProduct.stock) {
        
        let product = this.products.find(prod => prod.code === newProduct.code)
        
        if (product) return 'El codigo ingresado esta repetido'
        
         this.products.push({id: this.products.length+1,...newProduct})

        }

        await fs.writeFile(this.path, JSON.stringify(this.products))        
    }

    readProduct = async() => {
      if(!fs.existsStnc(this.path)){
        return(`El Archivo ${this.path} no existe`)
      }
      let respuesta = await fs.readFile(this.path, "utf-8")
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
      let productFilter = respuesta3.filter(prod => prod.id !=id)
      await fs.writeFile(this.path, JSON.stringify(productFilter, null, 2))
    }

    updateProduct = async ({id,...product}) =>{
      await this.deleteProductById(id)
      let productOld = await this.readProduct()
      let productMod = [{...product, id}, ...productOld]
      await fs.writeFile(this.path, JSON.stringify(productMod, null, 2))
    }
  }

const product = new ProductManager();
      
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