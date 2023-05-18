const { Router } = require('express')
const  cartModel  = require('../dao/mongo/cart.mongo.js')


const router = Router()

router.get('/',  async (req, res)=>{
    try {
        
        const carts = await cartModel.getCart(); 
        console.log(carts)
        res.send({
            status: 'success',
            payload: carts
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      let carts = await cartModel.getCartById(cid);
      res.status(200).send({
        status: 'success',
        payload: carts
      });
    } catch (error) {
      console.log(error);
    }
  });


router.post('/', async (req, res) => {
    try {
      const newCart = req.body;
  
      let result = await cartModel.addCart(newCart);
  
      res.status(200).send({
        status: 'success',
        payload: result
      });
    } catch (error) {
      console.log(error);
    }
  });


router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = req.body

    try{

    if(!cart.pid || !cart.cantidad){ 
        return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
    }
   
    let  cartToReplace = {
        pid: cart.pid, 
        cantidad: cart.cantidad,
    }

    let result = await cartModel.updateCart(cid, cartToReplace)
    

    res.send({
        status: 'success',
        payload: result
    })
} catch (error){
    console.log(error)
}
})


router.delete('/:cid', async (req, res) => {
    try {
      let { cid } = req.params;
  
      let result = await cartModel.deleteCart(cid);
      res.send({ status: 'success', payload: result });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router