import express from "express"
import ProductManager from "./components/ProductManager.js" 


const app = express()
app.use(express.urlencoded({extended: true}))


const product = new ProductManager()
const readProduct = product.readProduct()


app.get("/products", async (req, res) =>{
    res.send(await readProduct)
})


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express Local Host ${server.address().port}`)
})

server.on("error", (error) => console.log(`ERROR del servidor ${error}`))