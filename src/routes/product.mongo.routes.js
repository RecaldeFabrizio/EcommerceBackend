const { Router } = require('express');
const { ProductController } = require('../controllers/products.controller')

const router = Router();
const products = new ProductController()

router.get('/',  products.getProducts)

router.get('/:pid', products.getProuduct)

router.post('/', products.createProduct)

router.put('/:pid', products.updateProduct)

router.delete('/:pid' , products.deleteProduct)

module.exports = router;