const {promises, as ,fs, existsSync} = require ("fs")

module.exports = class ProductManager {
    
    constructor(){
      this.products = []
      this.path = "./productos.json"
    }

    addProduct = async (newProduct) => {
        if(newProduct.title && newProduct.description && newProduct.price && newProduct.img && newProduct.code && newProduct.stock) {
        
        let product = this.products.find(prod => prod.code === newProduct.code)
        
        if (product) return 'El codigo ingresado esta repetido'

        let ProductList = await this.readProduct()
        
         let newProductList = [...ProductList, {id: ProductList.length+1,...newProduct}]
         this.products = newProductList

         await Pfs.writeFile(this.path, JSON.stringify(newProductList)) 
         return "Producto Agregado Correctamente"

        }else{
          return "Faltan Campos Requeridos"
       }

    }

    readProduct = async () => {
      if (!existsSync(this.path)) {
        return (`El Archivo ${this.path} no existe`)
      }
      let respuesta = await Pfs.readFile(this.path, "utf-8")
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
      await fs.writeFile(this.path, JSON.stringify(productFilter, null, 2))
    }

    updateProduct = async ({id,...updatedFields}) =>{
      let products = await this.readProduct()
      let productIndex = products. findIndex (prod => prod.id === id)
      if(productIndex === -1){
        return "Product not Found"
      } 
      let product = {...products[productIndex], ...updatedFields, id}
      products[productIndex] = product
      await Pfs.writeFile(this.path, JSON.stringify(products, null, 2))
      return "Producto Actulizado"
    }
  }

//const product = new ProductManager();
      

//product.addProduct({title: "produto3",description: "descrition3",price: 3000,img: "img3",code: "A3",stock:3000})
//product.addProduct({title: "produto2",description: "descrition2",price: 2000,img: "img2",code: "A2",stock:2000})
//product.addProduct({title: "produto1",description: "descrition1",price: 1000,img: "img1",code: "A1",stock:1000})
//product.addProduct({title: "produto4",description: "descrition4",price: 4000,img: "img4",code: "A4",stock:4000})
//product.addProduct({title: "produto5",description: "descrition5",price: 5000,img: "img5",code: "A5",stock:5000})
//product.addProduct({title: "produto6",description: "descrition6",price: 6000,img: "img6",code: "A6",stock:6000})
//product.addProduct({title: "produto7",description: "descrition7",price: 7000,img: "img7",code: "A7",stock:7000})
//product.addProduct({title: "produto8",description: "descrition8",price: 8000,img: "img8",code: "A8",stock:8000})
//product.addProduct({title: "produto9",description: "descrition9",price: 9000,img: "img9",code: "A9",stock:9000})
//product.addProduct({title:"producto10",description:"description10", price:10000,img:"img10",code:"A10",stock:10000})

//product.getProduct()