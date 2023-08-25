const express = require('express' )
const mongoose = require('mongoose' )
const cookieParser = require('cookie-parser' )

const usersRouter = require('./routes/users.router.js' )
const petsRouter = require('./routes/pets.router.js' )
const adoptionsRouter = require('./routes/adoption.router.js' )
const sessionsRouter = require('./routes/sessions.router.js')
const { addLogger } = require('./middleware/logger.middleware.js')
const { logger } = require('./config/logger.js')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

const app = express() 
const PORT = process.env.PORT||8080 
const connection = mongoose.connect(`mongodb://localhost:27017/proyectos`)
logger.info('Base de datos conectada')

app.use(express.json())
app.use(cookieParser())
app.use(addLogger)

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación para la app de mascotas',
            description: 'Esta es la documentación de adoptame'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/api/users',usersRouter) 
app.use('/api/pets',petsRouter) 
app.use('/api/adoptions',adoptionsRouter) 
app.use('/api/sessions',sessionsRouter) 

app.listen(PORT,()=>logger.info(`Listening on ${PORT}`))
