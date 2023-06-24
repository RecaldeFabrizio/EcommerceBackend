const { Router } = require('express');
const { 
  getProduct,  
  createProduct, 
  updateProduct, 
  deleteProduct
 } = require('../controllers/products.controller')

const router = Router();

router.get('/',  getProduct)

router.post('/', createProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid' , deleteProduct)

module.exports = router;