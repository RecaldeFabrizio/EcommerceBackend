const RouterClass = require('./RouterClass.js')
const jwt = require('jsonwebtoken')

class UserRouter extends RouterClass{
    init(){
        this.get('/',['PUBLIC'],async(req,res)=>{
            try {
                res.sendSuccess('hola coder')
                
            } catch (error) {
                res.sendServerError(error)
            }
        })
        this.get('/current',['ADMIN'],async(req,res)=>{
            try {
                res.sendSuccess('validar')
                
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

module.exports = UserRouter

