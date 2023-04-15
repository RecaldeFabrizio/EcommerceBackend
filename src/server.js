const express = require ("express")
const { Router } = require ("express")
const cookieParser = require ("cookie-parser")
const {uploader} = require ("./utils.js")
//import path from "path"
//import dirname from "path"
const ProductManager = require ("./components/ProductManager.js") 
const {productRoutes} = require ("./routes/productsRoutes.js")


const product = new ProductManager()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/static", express.static(__dirname+"/public"))

app.use((req, res, next) =>{
    console.log("nid app - time", Date.now())
    next()
})


app.use("/api/products", productRoutes(product))

app.use("/single", uploader, (req, res) => {
    res.status(200).send({
        Status: 'success',
        massage: 'Archivo Subido'
    })
})


app.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).send("Todo Mal")
})



const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express Local Host ${server.address().port}`)
})

server.on("error", (error) => console.log(`ERROR del servidor ${error}`))