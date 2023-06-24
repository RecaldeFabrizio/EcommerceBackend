const { productService } = require ("../service/index.js")

class ProductController {

getProduct = async (req, res)=>{
  try {
      //const {page = 1} = req.query
      //const product = await productService.paginate({},{limit: 1, page: page, lean: true})
      let products = await productService.get()
      //const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products
      //console.log(docs)

      /* res.render('products',{
        status: 'success',
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        totalPages
    }) */

      res.send({status: 'success', payload: products})
      
  } catch (error) {
      console.log(error)
  }
}

createProduct = async (req, res) => {
  try {

    let products = req.body

    const newProduct ={
      title: products.title,
      description: products.description,
      thumbnail: products.thumbnail,
      price: products.price,
      stock: products.stock,
      code: products.code     
    }

    let result = await productService.create(newProduct);

    res.status(200).send({result})

  } catch (error) {
    console.log(error);
  }
}

updateProduct = async (req, res) => {
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

    let result = await productService.updateOne({_id: pid}, productsToReplace);

    res.status(200).send({
      status: 'success',
      payload: result
    });
  } catch (error) {
    console.log(error);
  }
}

deleteProduct = async (req, res) => {
  try {
    let { pid } = req.params;

    let result = await productService.deleteOne({_id: pid});
    res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log(error);
  }
}

}

module.exports = new ProductController()