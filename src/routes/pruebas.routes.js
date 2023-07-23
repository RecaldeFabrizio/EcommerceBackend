const {Router} = require('express')
const { auth } = require('../middleware/autenticacionMiddleware.js')
const {fork} = require('child_process')
const nodemailer = require('nodemailer')
const { sendMail } = require('../utils/sendmail.js')
const { sendWhatsapp, sendSms } = require('../utils/sendsms.js')
const { generateUser } = require('../utils/generateUserFaker.js')
const compression = require ('express-compression')
const { route } = require('./product.mongo.routes.js')
const { logger } = require ('../config/logger.js')
const { faker } = require ('@faker-js/faker')


const router = Router()


router.get('/testuser', (req, res)=>{
    let persona = {
        first_name: faker.person.firstName(),
        last_name:  faker.person.lastName(),
        email:      faker.internet.email(),
        password:   faker.internet.password()
    }

    res.send({
        status: 'success', 
        payload: persona
    })
}) 

router.get('/simple',(req,res) => {
    let suma = 0
    for (let i = 0; i < 1000000; i++) {
        suma += i
    }
    res.send({status: 'success', message: `El worker &{process.id} a a tendido esta peticion, el resultado es :&{suma}`})
})

router.get('/compleja',(req,res) => {
    let suma = 0
    for (let i = 0; i < 5e8; i++) {
        suma += i
    }
    res.send({status: 'success', message: `El worker &{process.id} a a tendido esta peticion, el resultado es :&{suma}`})
})

// artillery quick --count 40 --num 50 'http://localhost:8080/pruebas/simple' -o simple.json 
// artillery quick --count 40 --num 50 'http://localhost:8080/pruebas/compleja' -o compleja.json 
// npm i artillery-plugin-metrics-by-endpoint
// artillery run config.yaml --output testPerformance.json


router.get('/logger', (req, res) => {
    // req.logger.warn('alerta')
    // req.logger.error('alerta')
    // req.logger.info('info')
    // req.logger.warning('warning')
    // req.logger.error('error')
    // req.logger.fatal('fatal error')

    res.send({message: 'prueba de logger'})
})




router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))


router.get('/stringmuylargo', (req, res)=> {
    let string = `Hola Coders, soy una string ridículamente largo`
    for(let i=0; i<5e4; i++){
        string += `Hola Coders, soy una string ridículamente largo`
    }
    res.send(string)
})


router.get('/mocks', (req, res)=> {
    let users = []
    for (let i = 0; i < 100; i++) {
        users.push(generateUser())      
    }
    res.send({
        status: 'success',
        payload: users
    })
})


/* router.get('/sms', async (req, res) => {
    //await sendSms('Fabrizio', 'Recalde')
    await sendWhatsapp('Fabrizio', 'Recalde')
    res.send('SMS enviado')
}) */


router.get('/mail', async (req, res) =>{

    let destino = 'fabrizio.recalde98@gmail.com'
    let subject = 'correo de prueba'
    let html = `<div>
    <h1>Ecommerce test</h1>
    </div>`

    let result = await sendMail(destino, subject, html)

    res.send('Email enviado')
})


function operacionCompleja() {
    let result = 0
    for (let i = 0; i < 9e9; i++) {
        result += i        
    }
    return result
}


router.get('/block', (req, res)=>{
    const result = operacionCompleja()
    res.send(`el resultado de la operación es ${result}`)
})


router.get('/noblock', (req, res)=>{
    const child = fork('./src/utils/operacionCompleja.js')
    
    child.send('Inicia el processo de cáclculo')
    child.on('message', result => {
        res.send(`el resultado de la operación es ${result}`)
    })
})


router.get('/suma', (req, res)=>{    
    res.send(`Hola mundo`)
})


const nombres = ['fede', 'juan']


router.param('nombre', (req, res, next, nombre)=>{
    if(!nombres.includes(nombre)) {
        req.nombre = null
    }else{
        req.nombre = nombre
    }
    next()
})


router.get('/params/:nombre([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)', (req,res) => {
    res.send({
        message: req.nombre
    })
})


router.get('/params/:nombre([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)/:apellido', (req,res) => {
    res.send({
        message: req.params.nombre
    })
})


router.put('/params/:nombre([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)', (req,res) => {
    res.send({
        message: req.params.nombre
    })
})


router.delete('/params/:nombre([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)', (req,res) => {
    res.send({
        message: req.params.nombre
    })
})


router.get('*', async (req,res)=> {
    res.status(404).send('404 Not found')
})


router.get('/', (req, res)=>{
    res.render('login', {})
})


router.post('/getcookieuser', (req, res)=> {
    const {username, email} = req.body
    
    res.cookie(username, email, {maxAge: 1000000,signed: true}).send({mensaje: 'seteado'})
})


router.get('/setCookie', (req, res)=> {
    res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', {maxAge: 10000000}).send('cookie setada')
})


router.get('/getCookie', (req, res)=> {
    res.send(req.cookies)
})


router.get('/setSignedCookie', (req, res)=> {
    res.cookie('SignedCookie', 'Esta es una cookie muy poderosa', {maxAge: 10000000, signed: true}).send('cookie setada')
})


router.get('/getSignedCookie', (req, res)=> {
    res.send(req.signedCookies)
})


router.get('/deleteCookie', (req, res)=>{
    res.clearCookie('CoderCookie').send('cookie removed')
})


module.exports = router
