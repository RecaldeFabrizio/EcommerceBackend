const  Router  = require ("express")
const ProductManager = require ("../components/ProductManager.js")                                                                                                                                                                              

const productRoutes  = (Product) =>{

//const product = new ProductManager()
const readProduct = Product.readProduct()
const router = Router()

router.get("/", async (req, res) =>{
    let limit = parseInt(req.query. limit)
    if(!limit) return res.send(await readProduct)
    let allProducts = await readProduct
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
})


router.post("/", async (req, res) =>{
    let newProduct = req.body
    let addProducts = await Product.addProduct(newProduct)
    res.send(addProducts)
})


router.put("/:pid", async (req, res) => {
    let {pid} = req.params
    let updatedFields = req.body
    updatedFields.id = parseInt(pid) 
    let result = await Product.updateProduct(updatedFields) 
    res.send(result)
})


router.delete("/:pid", async (req, res) => {
    let {pid} = req.params
    await Product.deleteProductById(parseInt(pid))
    res.send(`El producto en el ID: ${pid} fue eliminado correctamente`)
})
 

router.get("/:pid", async (req, res) =>{
    let pid = parseInt(req.params.pid)
    let allProducts = await readProduct
    let productByPid = allProducts.find(prod => prod.id === pid)
    res.send(productByPid)
})

return router

}

module.exports = {productRoutes}    