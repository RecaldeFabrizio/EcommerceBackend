const express = require ("express")
const handlebars = require ("express-handlebars")
const cookieParser = require ("cookie-parser")
const {uploader} = require ("./utils/utils.js")
const  productMongoRoutes = require ("../src/routes/product.mongo.routes.js")
const contactsRouter = require('./routes/contacts.router.js')
const cookieRoutes = require ("./routes/cookieRoutes.js")
const pruebasRoutes = require ('./routes/pruebas.routes.js')
const sessionRouter = require ("./routes/sessionRoutes.js")
const cartRoutes = require ("./routes/cartRoutes.js")
const UserRouter = require ("./routes/userRoutes.js")
const userTestRouter = require('./routes/userTest.routes.js')
const paymentsRouter = require ('./routes/payments.router.js')
const viewsRoutes = require ("./routes/viewsRoutes.js")
const objetConfig = require ("./config/objetConfig.js")
const {Server} = require ("socket.io")
const { socketChat } = require("./utils/socketChat.js")
const { socketProduct } = require("./utils/socketProduct.js")
const {initPassport} = require ('./passport-jwt/passport.config.js')
const passport = require('passport')
const cors = require ("cors")
const { errorHandler } = require("./middleware/error.middleware.js")
const { addLogger, logger } = require("./config/logger.js")
const swaggerUiExpress = require ('swagger-ui-express')
const specs = require("./config/swaggerConfig.js")
const sessionConfig = require("./config/sessionConfig.js")
const ProductManagers = require("./controller/ProductSocket.js")
const { productRoutes } = require("./routes/productsRoutes.js")




const product = new ProductManagers()
const app = express()
const { Server: ServerHTTP } = require('http')



const serverHttp = new ServerHTTP(app)
const PORT =  process.env.PORT


const io = new Server(serverHttp)

objetConfig .connectDB


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('P@l@bra53cr3t0'))
app.use(addLogger)
app.use(sessionConfig)

initPassport()
passport.use(passport.initialize())
passport.use(passport.session()) 


app.use("/static", express.static(__dirname+"/public"))

app.use((req, res, next) =>{
    logger.info("nid app - time", Date.now())
    next()
})

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


app.use("/", viewsRoutes)
app.use('/api/payments', paymentsRouter)
app.use("/cookie", cookieRoutes)
app.use('/pruebas', pruebasRoutes)
app.use('/api/session', sessionRouter)
app.use("/api/product", productMongoRoutes)
app.use("/productSocket", productRoutes(product))
app.use("/api/cart", cartRoutes)
app.use("/api/user", UserRouter)
app.use('/api/userTest', userTestRouter)
app.use("/api/contacts", contactsRouter)
app.post('/static', uploader.single('myfile'), (req, res)=>{
    res.status(200).send({
        status: 'success',
        message: 'se subió correctamente'
    })
})

socketChat(io)
socketProduct(io)

app.use(errorHandler)

exports.initServer = () => serverHttp.listen(PORT,()=>{
    logger.info(`Express Local Host: ${PORT}`)
})
