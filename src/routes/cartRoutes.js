const { Router } = require('express')
const  { cartModel }  = require('../dao/models/cart.model.js')


const router = Router()

router.get('/',  async (req, res)=>{
    try {
        
        /* const {page = 1} = req.query */
        const carts = await cartModel.find({}/* ,{limit: 1, page: page, lean: true} */)
        /* const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = carts */
        //console.log(docs)

       /*  res.render('cart',{
          carts: docs,
          status: 'success',
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
          totalPages
      }) */
        res.send({status: 'success', payload: carts})
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      let cart = await cartModel.findOne({_id: cid});
      if(!cart){
        return res.status(404).send({status: 'error', message: 'cart not found'})
      }
      res.status(200).send({
        status: 'success',
        payload: cart
      });
    } catch (error) {
      console.log(error);
    }
  });


router.post('/', async (req, res) => {
    try {

      let cart ={
            
        cart:[]
      }
  
      let result = await cartModel.create({});
  
      res.status(200).send({
        status: 'success',
        payload: result
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/:cid/product/:pid', async (req, res) =>{
    try{

      let {cid, pid} = req.params
      let {quantity} = req.body

      let resultUpdate = await cartModel.findOneAndUpdate(
        {_id: cid, 'cart.product': pid},
        {$inc:{'cart.$.quantity': quantity}},
        {new: true}
      )

      if (resultUpdate){
        res.send('producto añadido')
      }

      await cartModel.findByIdAndUpdate(
        {_id: cid},
        {$push : {cart: {product: pid, quantity}}},
        {new: true, upsert: true}
      )


    }catch (error) {
      console.log(error)
    }
  })


router.delete('/:cid', async (req, res) => {
  try {

    let { cid } = req.params;

    let result = await cartModel.findOneAndUpdate(
      {_id: cid},
      {$set: {cart: []}},
      {new: true}
    )

    if(result){
      res.send('carrito vacio')
    }

  } catch (error) {
    console.log(error)
  }
})


router.delete('/:cid/product/:pid', async (req, res) => {
    try {

      let {cid, pid} = req.params

      let result = await cartModel.findOneAndUpdate(
        {_id: cid},
        {$pull: {cart: {product: pid}}},
        {new: true}
      )
      if(result){
        res.send('Carrito vacio')
      }
  
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router