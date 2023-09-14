
const { userModel } = require ('../dao/models/user.model.js')


class SessionController {

    login = async (req, res)=>{
        try {
            const {email, password} = req.body

            const userDB = await userModel.findOne({email, password})


            if (!userDB) return res.send({status: 'error', message: 'No existe ese usuario, revisar'})

            req.user = {
                first_name: userDB.first_name,
                last_name: userDB.last_name,
                email: userDB.email,
                role: 'admin'
            }
        
    
            /* const token = generateToken(user) */
            
            /* .cookie('coderCookieToken', token, {
                maxAge: 60*60*10000,
                httpOnly: true
            }) */res.send({
                status: 'success',
                message: 'login success',
                user
            })
        } catch (error) {
            console.log(error)
        }
    }

    register = async (req, res)=>{
        try {
            const {first_name, last_name, email, password} = req.body 

            const existUser = await userModel.findOne({email})


        if (existUser) return res.send({status: 'error', message: 'el email ya está registrado' })

            const newUser = {
            first_name,
            last_name, 
            email: username,
            password: createHash(password)
            }

            let user = await userModel.create(newUser)

            /* const token = generateToken(user) */


            res.send({
                status: 'success',
                newUser
            })
        } catch (error) {
            console.log(error)
        }
    }

    logout = async (req, res)=>{
        try {
            req.session.destroy(err=>{
                if (err) {
                    return res.send({status: 'error', error: err})
                }
                res.send('logout ok')
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    
}


module.exports = new SessionController()
