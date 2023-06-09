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
    
    createUsers = async (req, res)=>{
        try {
            let user = req.body
    
            if(!user.nombre || !user.apellido){ 
                return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
            }
    
            const newUser = {
                first_name: user.nombre, 
                last_name: user.apellido,
                email: user.email
            } 
            
            let result =  await userService.create(newUser) 
    
            
            res.status(200).send({result})
        } catch (error) {
            console.log(error)
        }
        
    }
    
    updateUsers = async (req, res) => {
        const { uid } = req.params
        const user = req.body
    
        
        if(!user.nombre || !user.apellido){ 
            return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
        }
       
        let  userToReplace = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }
    
        let result = await userModel.updateOne({_id: uid}, userToReplace)
        
    
        res.send({
            status: 'success',
            payload: result
        })
    }
    
    deleteUsers = async (req, res) => {
        try {
            let {uid} = req.params
        
            let result = await userModel.deleteOne({_id: uid})
            res.send({status: 'success', payload: result})
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()
