const express = require ("express")
const handlebars = require ("express-handlebars")
const cookieParser = require ("cookie-parser")
const session = require ("express-session")
const FileStore = require ("session-file-store")
const {create} = require ("connect-mongo")
const { Router } = require ("express")
const {uploader} = require ("./utils/utils.js")
const ProductManager = require ("./components/ProductManager.js") 
const {productRoutes} = require ("./routes/productsRoutes.js")
const  productMongoRoutes = require ("./routes/product.mongo.routes.js")
const pruebaRoutes = require ("./routes/pruebaRoutes.js")
const sessionRouter = require ("./routes/sessionRoutes.js")
const cartRoutes = require ("./routes/cartRoutes.js")
const userRoutes = require ("./routes/userRoutes.js")
const viewsRoutes = require ("./routes/viewsRoutes.js")
const objetConfig = require ("./config/objetConfig.js")
const {Server} = require ("socket.io")
const { socketChat } = require("./utils/socketChat.js")
const { socketProduct } = require("./utils/socketProduct.js")
const {CartManager} = require("./components/cartManager.js")
const { initPassport, initPassportGithub } = require('./config/passport.config.js')
const passport = require('passport')



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
app.use(cookieParser('P@l@bra53cr3t0'))
//const fileStore = FileStore(session)
app.use(session({
    store: create({
        mongoUrl:'mongodb+srv://FDR98:Hesoyam123@cluster0.gkja86y.mongodb.net/test',
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopoLogy: true
        },
        ttl: 100000*6
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
}))

initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())


app.use("/static", express.static(__dirname+"/public"))

app.use((req, res, next) =>{
    console.log("nid app - time", Date.now())
    next()
})
app.use("/", viewsRoutes)
app.use("/prueba", pruebaRoutes)
app.use('/api/session', sessionRouter)
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