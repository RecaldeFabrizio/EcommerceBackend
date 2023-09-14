const { Router } = require("express");
const passport = require("passport");

const router = Router()

router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req, res) =>{
    if(!req.user) return res.status(401).send.json({status: 'error', message: 'invalid credencial'})

    const user = req.user

    req.session.user ={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        password: req.user.password,
        role: req.user.role
    }

    return res.status(200).json({ status: 'success', message: 'Login successful', user})
})


router.get('/faillogin', async (req,res)=>{
    console.log('Falló la estrategia')
    res.send({status: 'error', error: 'falló autenticación'})
})

router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) =>{
    res.send({status: 'success', message: 'User registed'})
})

router.get('/failregister', async (req,res)=>{
    console.log('Falló la estrategia')
    res.send({status: 'error', error: 'falló autenticación'})
})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.send('logout ok')
    })
})

module.exports = router
