const { Router } = require('express');
const productManager = require('../dao/mongo/product.mongo.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).send({
      status: 'success',
      payload: products
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    let product = await productManager.getProductById(pid);
    res.status(200).send({
      status: 'success',
      payload: product
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;

    let result = await productManager.addProduct(newProduct);

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

    let result = await productManager.updateProduct(pid, productsToReplace);

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

    let result = await productManager.deleteProduct(pid);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;