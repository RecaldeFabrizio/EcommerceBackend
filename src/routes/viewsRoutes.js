const {Router} = require ("express")

const router = Router()

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('registerForm')
})


router.get("/chat", (req, res) =>{
    res.render("chat", {})
})

router.get("/realtimeprod", (req,res) =>{
    res.render("realtimeprod",{})
})


router.get("/", (req, res) => {
    
    let testUser = {
        name: "fabrizio",
        last_name: "recalde",
        title: "Ecomerce"
    }
    
    res.render("index", testUser)
})


router.post('/register', (req, res) => {
    const {name, email, password} = req.body
    const user = req.body
    res.send({
        name,
        email,
        password,
        mensaje: 'Regístro con éxito'
    })
})



module.exports = router