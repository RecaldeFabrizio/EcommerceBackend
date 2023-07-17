const express = require ("express")
const handlebars = require ("express-handlebars")
const cookieParser = require ("cookie-parser")
const session = require ("express-session")
const FileStore = require ("session-file-store")
const {create} = require ("connect-mongo")
const { Router } = require ("express")
const {uploader} = require ("./utils/utils.js")
const ProductManager = require ("./dao/manager/ProductManager.js") 
const {productRoutes} = require ("./routes/productsRoutes.js")
const  productMongoRoutes = require ("../src/routes/product.mongo.routes.js")
const contactsRouter = require('./routes/contacts.router.js')
const cookieRoutes = require ("./routes/cookieRoutes.js")
const pruebasRoutes = require ('./routes/pruebas.routes.js')
const sessionRouter = require ("./routes/sessionRoutes.js")
const cartRoutes = require ("./routes/cartRoutes.js")
//const UserRouter = require ("./routes/newUser.routes.js")
const UserRouter = require ("./routes/userRoutes.js")
const viewsRoutes = require ("./routes/viewsRoutes.js")
const objetConfig = require ("./config/objetConfig.js")
const {Server} = require ("socket.io")
const { socketChat } = require("./utils/socketChat.js")
const { socketProduct } = require("./utils/socketProduct.js")
const {CartManager} = require("./dao/manager/cartManager.js")
/* const { initPassport, initPassportGithub } = require('./config/passport.config.js') */
const {initPassport} = require('./passport-jwt/passport.config.js')
const passport = require('passport')
const cors = require ("cors")
const { errorHandler } = require("./middleware/error.middleware.js")



const product = new ProductManager()
const app = express()
//const userRouter = new UserRouter()

const PORT = 8080; //precess.env.PORT
const httpServer = app.listen(PORT, () => {
    console.log(`Express Local Host ${httpServer.address().port}`)
})

const io = new Server(httpServer)

objetConfig .connectDB


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('P@l@bra53cr3t0'))
//const fileStore = FileStore(session)
/* app.use(session({
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
})) */

initPassport()
//initPassportGithub()
passport.use(passport.initialize())
//passport.use(passport.session())


app.use("/static", express.static(__dirname+"/public"))

app.use((req, res, next) =>{
    console.log("nid app - time", Date.now())
    next()
})
app.use("/", viewsRoutes)
app.use("/cookie", cookieRoutes)
app.use('/pruebas', pruebasRoutes)
app.use('/api/session', sessionRouter)
app.use("/api/products", productRoutes(product))
app.use("/api/productMongo", productMongoRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/user", UserRouter)//.getRouter())
app.use("/api/contacts", contactsRouter)
app.post('/static', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })
})

socketChat(io)
socketProduct(io)

/* app.use((err, req, res, next) =>{
    console.log(err)
    res.status(500).send("Todo Mal")
}) */
app.use(errorHandler)
