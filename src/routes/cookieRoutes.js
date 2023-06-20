const {Router} = require('express')
const router = Router()


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
