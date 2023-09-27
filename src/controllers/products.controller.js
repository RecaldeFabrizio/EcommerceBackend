const { productService } = require ("../service/index.js")

class ProductController {

getProducts = async (req, res)=>{
  try {
      //const {page = 1} = req.query
      //const product = await productService.paginate({},{limit: 1, page: page, lean: true})
      const products = await productService.get()
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

getProuduct = async (req, res)=>{
  try {
      const {pid} = req.params
      let product = await productService.getById(pid)
      res.send({
          status: 'success',
          payload: product
      }) 
  } catch (error) {
      console.log(error)
  }
}



createProduct = async (req, res) => {
  try {
    let product = req.body

    if(!product.title || !product.description || !product.thumbnail || !product.price || !product.stock || !product.code){ 
      return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
  }

  let newProduct = {
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail,
    price: product.price,
    stock: product.stock,
    code: product.code
  };
    
    let  result = await productService.create(newProduct)
    res.send({
        stauts: 'success',
        payload: result
    }) 
} catch (error) {
    console.log(error)
}
}


updateProduct = async (req, res) => {
  const { pid } = req.params;
  const product = req.body;

    if(!product.title || !product.description || !product.thumbnail || !product.price || !product.stock || !product.code){ 
      return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
  }

    let productsToReplace = {
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
      code: product.code
    };

    let result = await productService.update({_id: pid}, productsToReplace);

    res.status(200).send({
      status: 'success',
      payload: result
    });
}

deleteProduct = async (req, res) => {
  try {
    let { pid } = req.params;

    let result = await productService.delete({_id: pid});
    res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log(error);
  }
}

}

module.exports =  {ProductController}
