const { cartModel } = require("../dao/models/cart.model")
const { userService } = require("../service")

class UserController {

    getUsers = async (req, res)=>{
        try {
            //const {page=1} = req.query
            //const limit = 10
            //let user = await userService.paginate({}, {limit: 10, page: page, lean: true})
            let user = await userService.get(/* limit, page */)
            //const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = user
    
    
           /*  res.render('user',{
                status: 'success',
                user: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages
            }) */
            res.send({status: 'success', payload: user})
        } catch (error) {
            console.log(error)
        }
    }

    getUsersById = async (req, res)=>{
        try {
            const {uid} = req.params
            let user = await userService.getById(uid)
            res.send({
                status: 'success',
                payload: user
            }) 
        } catch (error) {
            console.log(error)
        }
      }
    
    createUsers = async (req, res)=>{
        try {
            let user = req.body
    
            if(!user.first_name || !user.last_name){ 
                return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
            }
    
            const newUser = {
                first_name: user.first_name, 
                last_name: user.last_name,
                email: user.email
            } 
            
            let result =  await userService.create(newUser) 
            let newCart = await cartModel.create({cart: []})

            result.cart = newCart._id
            await result.save();

    
            
            res.status(200).send({result,newCart})
        } catch (error) {
            console.log(error)
        }
        
    }
    
    updateUsers = async (req, res) => {
        const { uid } = req.params
        const user = req.body
    
        
        if(!user.first_name || !user.last_name){ 
            return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
        }
       
        let  userToReplace = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
    
        let result = await userService.update({_id: uid}, userToReplace)
        
    
        res.send({
            status: 'success',
            payload: result
        })
    }
    
    deleteUsers = async (req, res) => {
        try {
            let {uid} = req.params
        
            let result = await userService.delete({_id: uid})
            res.send({status: 'success', payload: result})
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()
