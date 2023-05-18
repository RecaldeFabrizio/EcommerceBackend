const express = require ("express")
const handlebars = require ("express-handlebars")
const cookieParser = require ("cookie-parser")
const { Router } = require ("express")
const {uploader} = require ("./utils/utils.js")
const ProductManager = require ("./components/ProductManager.js") 
const {productRoutes} = require ("./routes/productsRoutes.js")
const  productMongoRoutes = require ("./routes/product.mongo.routes.js")
const cartRoutes = require ("./routes/cartRoutes.js")
const userRoutes = require ("./routes/userRoutes.js")
const viewsRoutes = require ("./routes/viewsRoutes.js")
const objetConfig = require ("./config/objetConfig.js")
const {Server} = require ("socket.io")
const { socketChat } = require("./utils/socketChat.js")
const { socketProduct } = require("./utils/socketProduct.js")
const {CartManager} = require("./components/cartManager.js")


const product = new ProductManager()
const app = express()

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Express Local Host ${httpServer.address().port}`)
})

const io = new Server(httpServer)

objetConfig .connectDB()


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/static", express.static(__dirname+"/public"))

app.use((req, res, next) =>{
    console.log("nid app - time", Date.now())
    next()
})

app.use("/", viewsRoutes)
app.use("/api/products", productRoutes(product))
app.use("/api/productMongo", productMongoRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/user", userRoutes)

app.post('/static', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })
})

socketChat(io)
socketProduct(io)

app.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).send("Todo Mal")
})