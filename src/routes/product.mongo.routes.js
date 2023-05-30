const { Router } = require('express');
const {productModel} = require('../dao/mongo/models/product.model.js')

const router = Router();

router.get('/',  async (req, res)=>{
  try {
      
      const {page = 1} = req.query
      const product = await productModel.paginate({},{limit: 1, page: page, lean: true})
      const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = product
      //console.log(docs)

      res.render('products',{
        status: 'success',
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        totalPages
    })
      
  } catch (error) {
      console.log(error)
  }
})

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    let products = await productModel.findOne({_id: pid});
    if(!products){
      return res.status(404).send({status: 'error', message: 'product not found'})
    }
    res.status(200).send({
      status: 'success',
      payload: products
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {

    let products ={
      title: products.title,
      description: products.description,
      thumbnail: products.thumbnail,
      price: products.price,
      stock: products.stock,
      code: products.code     
    }

    let result = await productModel.create({});

    res.status(200).send({
      status: 'success',
      payload: result
    });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const products = req.body;

  try {
    let productsToReplace = {
      title: products.title,
      description: products.description,
      thumbnail: products.thumbnail,
      price: products.price,
      stock: products.stock,
      code: products.code
    };

    let result = await productModel.updateProduct(pid, productsToReplace);

    res.status(200).send({
      status: 'success',
      payload: result
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    let { pid } = req.params;

    let result = await productModel.deleteProduct(pid);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;