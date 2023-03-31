import express from "express"
import ProductManager from "./components/ProductManager.js" 


const app = express()
app.use(express.urlencoded({extended: true}))


const product = new ProductManager()
const readProduct = product.readProduct()

console.log(await readProduct)
