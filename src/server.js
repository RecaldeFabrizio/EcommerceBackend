import express from "express"
import ProductManager from "./components/ProductManager.js" 


const app = express()
app.use(express.urlencoded({extended: true}))


const product = new ProductManager()
const readProduct = product.readProduct()


app.get("/products", async (req, res) =>{
    let limit = parseInt(req.query. limit)
    if(!limit) return res.send(await readProduct)
    let allProducts = await readProduct
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
})


app.get("/products/:id", async (req, res) =>{
    let id = parseInt(req.params.id)
    let allProducts = await readProduct
    let productById = allProducts.find(prod => prod.id === id)
    res.send(productById)
})


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express Local Host ${server.address().port}`)
})

server.on("error", (error) => console.log(`ERROR del servidor ${error}`))