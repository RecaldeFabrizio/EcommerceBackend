const {Router} = require('express')
const { auth } = require('../middleware/autenticacionMiddleware.js')
const { userModel } = require('../dao/mongo/models/user.model.js')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const passport = require('passport')
const { generateToken } = require('../utils/jwt.js')

const router = Router()


//router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req,res) => { 
    //if (!req.user) return res.status(401).send({status: 'error', message: 'invalid credencial'})
    //req.session.user= {
       // first_name: req.user.first_name,
       // last_name: req.user.last_name,
       // email: req.user.email
   // }
   // res.send({status: 'success', message: 'User registered'})
//})


//router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req,res) => {    
    //res.send({status: 'success', message: 'User registered'})
//})


//router.get('/github', passport.authenticate('github', {scope: ['user:email']}))
//router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),async (req, res)=>{
    //req.session.user = req.user
    //res.redirect('/api/products')
//}) 



//router.get('/faillogin', async (req,res)=>{
    //console.log('Falló la estrategia')
    //res.send({status: 'error', error: 'falló autenticación'})
//})


//router.get('/failregister', async (req,res)=>{
    //console.log('Falló la estrategia')
    //res.send({status: 'error', error: 'falló autenticación'})
//})


router.post('/login', async (req, res)=> {
    const {email, password} = req.body

    // const {password: pass, ...userDb} = await userModel.findOne({email})
    // 
    // console.log(userDB)

    // if (!userDB) return res.send({status: 'error', message: 'No existe ese usuario, revisar'})

    

    // if (!isValidPassword(password, userDB)) return res.status(401).send({
    //     status: 'error',
    //     message: 'El usuario o la contraseña no es la correcta'
    // })


    // req.session.user = {
    //     first_name: userDB.first_name,
    //     last_name: userDB.last_name,
    //     email: userDB.email,
    //     role: 'admin'
    // }

    // userDb 
    const access_token = generateToken({
        first_name: 'Fabrizio',
        last_name: 'Recalde',
        email: 'fabrizio.recalde98@gmail.com'
    })
    
    res.send({
        status: 'success',
        message: 'login success',
        access_token
        // session: req.session.user
    })
})


router.post('/register', async (req, res) => {
    try {
        const {username,first_name, last_name, email, password} = req.body 
    
        // const existUser = await userModel.findOne({email})
    
        // if (existUser) return res.send({status: 'error', message: 'el email ya está registrado' })
    
        // const newUser = new userModel({
        //     username,
        //     first_name,
        //     last_name, 
        //     email, 
        //     password 
        // })
        // await newUser.save()
    
        // const newUser = {
        //     username,
        //     first_name,
        //     last_name, 
        //     email, 
        //     password: createHash(password) 
        // }
        // let resultUser = await userModel.create(newUser)
    
        let token = generateToken({
            first_name: 'Fabrizio',
            last_name: 'Recalde',
            email: 'fabrizio.recalde98@gmail.com'
        })
    
    
        res.status(200).send({
            status: 'success',
            message: 'Usuario creado correctamente',
            token
        })
    } catch (error) {
        console.log(error)
    }
   
})




router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})


router.post('/restaurarpass', async (req, res) => {
    const { email, password } = req.body;
  
    const userDB = await userModel.findOne({ email });
  
    if (!userDB) {
      return res.status(401).send({status: 'error', message: 'El usuario no existe'})
    }    
  
    userDB.password = createHash(password)
    await userDB.save()

    res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'});
  })


router.get('/counter', (req, res)=> {
    if (req.session.counter) {
        req.session.counter ++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

router.get('/privada', auth,(req,res) => {

    res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
})



module.exports = router
